"use server";

import { Booking, Event } from "@/database";
import connectDB from "../mongodb";

export const createBooking = async ({
  eventId,
  slug,
  email,
}: {
  eventId: string;
  slug: string;
  email: string;
}) => {
  try {
    await connectDB();
    const event = await Event.findOne({ _id: eventId });
    if (!event) {
      return {
        success: false,
        message: "Event not found",
      };
    }
    const booking = (await Booking.create({ eventId, slug, email })).toObject();
    return {
      success: true,
      message: "Booking created successfully",
      booking: JSON.stringify(booking),
    };
  } catch (error) {
    console.error("Failed to create booking", error);
    return {
      success: false,
      message: "Failed to create booking",
      error: error,
    };
  }
};
