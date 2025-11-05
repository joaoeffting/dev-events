import Image from "next/image";
import { notFound } from "next/navigation";
import EventDetailComponent from "@/components/event-detail";
import EventAgenda from "@/components/event-agenda";
import EventTags from "@/components/event-tags";

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
          <p className="text-lg font-bold">Book Event</p>
        </aside>
      </div>
    </section>
  );
};

export default EventDetail;
