"use client";

import { createBooking } from "@/lib/actions/booking.actions";
import posthog from "posthog-js";
import { useState } from "react";

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  const [email, setEmail] = useState("");
  const [submited, setSubmited] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { success, error } = await createBooking({ eventId, slug, email });
    if (!success) {
      console.error("Booking creation failed", error);
      posthog.capture("event_booking_failed", { eventId, slug, email, error });
    } else {
      setSubmited(true);
      posthog.capture("event_booked", { eventId, slug, email });
    }
  };

  return (
    <div id="book-event">
      {submited ? (
        <p className="text-sm">Thank you for booking your spot</p>
      ) : (
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <button type="submit" className="button-submit">
            Book Event
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
