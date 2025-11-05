"use client";

const CreateEvent = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const response = await fetch("/api/events", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      console.log("Event created successfully");
    } else {
      console.error("Failed to create event");
    }
  };
  return (
    <div className="">
      <h1>Create Event</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="overview">Overview</label>
          <textarea id="overview" name="overview" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="image">Image</label>
          <input type="file" id="image" name="image" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="venue">Venue</label>
          <input type="text" id="venue" name="venue" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="location">Location</label>
          <input type="text" id="location" name="location" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="time">Time</label>
          <input type="time" id="time" name="time" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="mode">Mode</label>
          <select id="mode" name="mode">
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="audience">Audience</label>
          <input type="text" id="audience" name="audience" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="agenda">Agenda</label>
          <textarea id="agenda" name="agenda" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="organizer">Organizer</label>
          <input type="text" id="organizer" name="organizer" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="tags">Tags</label>
          <input type="text" id="tags" name="tags" />
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
