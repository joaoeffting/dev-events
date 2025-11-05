import Image from "next/image";
import { notFound } from "next/navigation";
import EventDetailComponent from "@/components/event-detail";
import EventAgenda from "@/components/event-agenda";
import EventTags from "@/components/event-tags";
import BookEvent from "@/components/book-event";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import EventCard from "@/components/event-card";

const EventDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${slug}`
  );

  const data = await response.json();

  if (!response.ok) {
    return <div>Failed to fetch event</div>;
  }

  const event = data.event;

  if (!event) {
    return notFound();
  }

  const bookings = 10;

  const similarEvents = await getSimilarEventsBySlug(slug);

  return (
    <section id="event">
      <div className="header">
        <h1>Event Details: {event.title}</h1>
        <p>Event Description: {event.description}</p>
      </div>
      <div className="details">
        <div className="content">
          <Image
            src={event.image}
            alt={event.title}
            width={800}
            height={800}
            className="banner"
          />
          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{event.overview}</p>
          </section>
          <section className="flex-col-gap-2">
            <h2>Event Details: </h2>

            <EventDetailComponent
              icon="/icons/calendar.svg"
              value={event.date}
            />
            <EventDetailComponent icon="/icons/clock.svg" value={event.time} />
            <EventDetailComponent icon="/icons/pin.svg" value={event.venue} />
            <EventDetailComponent icon="/icons/mode.svg" value={event.mode} />
            <EventDetailComponent
              icon="/icons/audience.svg"
              value={event.audience}
            />
          </section>
          <EventAgenda agendaItems={event.agenda} />
          <section className="flex-col-gap-2">
            <h2>Organizer</h2>
            <p>{event.organizer}</p>
          </section>
          <EventTags tags={event.tags} />
        </div>
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {bookings > 0 ? (
              <p className="text-sm">Join {bookings} others</p>
            ) : (
              <p className="text-sm">Be the first to book</p>
            )}
            <BookEvent />
          </div>
        </aside>
      </div>
      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents && similarEvents.length > 0 ? (
            similarEvents.map((event) => (
              <EventCard key={event.title} {...event} />
            ))
          ) : (
            <p>No similar events found</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventDetail;
