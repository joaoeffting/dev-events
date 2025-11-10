import EventCard from "@/components/event-card";
import ExploreBtn from "@/components/explore-btn";
import { IEvent } from "@/database";
import { cacheLife } from "next/cache";
import { events } from "@/lib/constants/events";

export default async function Home() {
  "use cache";
  cacheLife("hours");
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/events`
  // );
  // const data = await response.json();

  // if (!response.ok) {
  //   return <div>Failed to fetch events</div>;
  // }

  // const events = data.events;

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
          {events.map((event: IEvent) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
