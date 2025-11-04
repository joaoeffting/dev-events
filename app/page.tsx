import EventCard from "@/components/event-card";
import ExploreBtn from "@/components/explore-btn";
import { events } from "@/lib/constants/events";

export default function Home() {
  return (
    <section>
      <h1 className="text-center">
        The Hub for Every <br /> Dev Event
      </h1>
      <p className="text-center mt-5">
        Hackatons, meetups and conferences for developers all in one place
      </p>
      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured events</h3>
        <ul className="events">
          {events.map((event) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
