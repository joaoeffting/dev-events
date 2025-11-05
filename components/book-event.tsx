"use client";

import { useState } from "react";

const BookEvent = () => {
  const [email, setEmail] = useState("");
  const [submited, setSubmited] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmited(true);
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
