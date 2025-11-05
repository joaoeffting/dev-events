import { v2 as cloudinary } from "cloudinary";
import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

function getArrayField(formData: FormData, fieldName: string): string[] {
  const allValues = formData.getAll(fieldName);
  if (allValues.length > 0) {
    return allValues.map((item) => String(item));
  }
  const jsonValue = formData.get(fieldName);
  if (typeof jsonValue === "string") {
    try {
      return JSON.parse(jsonValue);
    } catch {
      return [];
    }
  }
  return [];
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();

    if (!formData) {
      return NextResponse.json(
        { message: "Invalid form data" },
        { status: 400 }
      );
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const overview = formData.get("overview") as string;
    const imageFile = formData.get("image") as File | null;
    const venue = formData.get("venue") as string;
    const location = formData.get("location") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const mode = formData.get("mode") as string;
    const audience = formData.get("audience") as string;
    const organizer = formData.get("organizer") as string;
    const agenda = getArrayField(formData, "agenda");
    const tags = getArrayField(formData, "tags");

    if (!imageFile || !(imageFile instanceof File)) {
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 }
      );
    }

    // get image and upload to cloudinary
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "events" },
          (error, result) => {
            if (error) reject(error);
            resolve(result);
          }
        )
        .end(buffer);
    });

    const imagePath = (uploadResult as { secure_url: string }).secure_url;

    const createdEvent = await Event.create({
      title,
      description,
      overview,
      image: imagePath,
      venue,
      location,
      date,
      time,
      mode,
      audience,
      agenda,
      organizer,
      tags,
    });

    return NextResponse.json(
      {
        message: "Event Created Successfully",
        event: createdEvent,
      },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    const error = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      {
        message: "Event Creation Failed",
        error,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json(
      {
        message: "Events fetched successfully",
        events,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Failed to get events", error: e },
      { status: 500 }
    );
  }
}
