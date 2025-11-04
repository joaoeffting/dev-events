import mongoose, { Schema, Model } from "mongoose";

export interface IEvent {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

type EventModel = Model<IEvent>;

const eventSchema = new Schema<IEvent, EventModel>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      validate: {
        validator: (value: string) => value.length > 0,
        message: "Title cannot be empty",
      },
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      validate: {
        validator: (value: string) => value.length > 0,
        message: "Description cannot be empty",
      },
    },
    overview: {
      type: String,
      required: [true, "Overview is required"],
      validate: {
        validator: (value: string) => value.length > 0,
        message: "Overview cannot be empty",
      },
    },
    image: {
      type: String,
      required: [true, "Image is required"],
      validate: {
        validator: (value: string) => value.length > 0,
        message: "Image cannot be empty",
      },
    },
    venue: {
      type: String,
      required: [true, "Venue is required"],
      validate: {
        validator: (value: string) => value.length > 0,
        message: "Venue cannot be empty",
      },
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      validate: {
        validator: (value: string) => value.length > 0,
        message: "Location cannot be empty",
      },
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
    },
    mode: {
      type: String,
      required: [true, "Mode is required"],
      enum: {
        values: ["online", "offline", "hybrid"],
        message: "Mode must be one of: online, offline, hybrid",
      },
    },
    audience: {
      type: String,
      required: [true, "Audience is required"],
      validate: {
        validator: (value: string) => value.length > 0,
        message: "Audience cannot be empty",
      },
    },
    agenda: {
      type: [String],
      required: [true, "Agenda is required"],
      validate: {
        validator: (value: string[]) => value.length > 0,
        message: "Agenda must contain at least one item",
      },
    },
    organizer: {
      type: String,
      required: [true, "Organizer is required"],
      validate: {
        validator: (value: string) => value.length > 0,
        message: "Organizer cannot be empty",
      },
    },
    tags: {
      type: [String],
      required: [true, "Tags are required"],
      validate: {
        validator: (value: string[]) => value.length > 0,
        message: "Tags must contain at least one item",
      },
    },
  },
  {
    timestamps: true,
  }
);

eventSchema.index({ slug: 1 }, { unique: true });

eventSchema.pre("save", function (next) {
  if (this.isModified("title") || this.isNew) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  if (this.isModified("date") || this.isNew) {
    const dateObj = new Date(this.date);
    if (!isNaN(dateObj.getTime())) {
      this.date = dateObj.toISOString().split("T")[0];
    }
  }

  if (this.isModified("time") || this.isNew) {
    this.time = this.time.trim().toUpperCase();
    if (!this.time.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]\s?(AM|PM)?$/)) {
      const timeParts = this.time.match(/(\d{1,2}):?(\d{2})?\s?(AM|PM)?/i);
      if (timeParts) {
        let hours = parseInt(timeParts[1], 10);
        const minutes = timeParts[2] ? parseInt(timeParts[2], 10) : 0;
        const period = timeParts[3]?.toUpperCase();

        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;

        this.time = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")} ${period || ""}`.trim();
      }
    }
  }

  next();
});

const Event =
  (mongoose.models.Event as EventModel) ||
  mongoose.model<IEvent, EventModel>("Event", eventSchema);

export default Event;
