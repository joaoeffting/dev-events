import mongoose, { Schema, Model, Types } from "mongoose";
import Event from "./event.model";

export interface IBooking {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

type BookingModel = Model<IBooking>;

const bookingSchema = new Schema<IBooking, BookingModel>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      validate: {
        validator: (value: string) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: "Please provide a valid email address",
      },
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.index({ eventId: 1 });
bookingSchema.index({ email: 1 });
bookingSchema.index({ createdAt: -1 });
bookingSchema.index({ eventId: 1, email: 1 }, { unique: true });

bookingSchema.pre("save", async function (next) {
  try {
    const event = await Event.findById(this.eventId);
    if (!event) {
      throw new Error(`Event with ID ${this.eventId} does not exist`);
    }
    next();
  } catch (error) {
    next(error as Error);
  }
});

const Booking =
  (mongoose.models.Booking as BookingModel) ||
  mongoose.model<IBooking, BookingModel>("Booking", bookingSchema);

export default Booking;
