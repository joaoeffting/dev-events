export interface Event {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: Event[] = [
  {
    title: "React Summit 2025",
    image: "/images/event1.png",
    slug: "react-summit-2025",
    location: "San Francisco, CA",
    date: "2025-03-15",
    time: "9:00 AM",
  },
  {
    title: "Next.js Conf",
    image: "/images/event2.png",
    slug: "nextjs-conf",
    location: "New York, NY",
    date: "2025-04-22",
    time: "8:30 AM",
  },
  {
    title: "DevHack 2025",
    image: "/images/event3.png",
    slug: "devhack-2025",
    location: "Austin, TX",
    date: "2025-05-10",
    time: "10:00 AM",
  },
  {
    title: "TypeScript Meetup",
    image: "/images/event4.png",
    slug: "typescript-meetup",
    location: "Seattle, WA",
    date: "2025-06-05",
    time: "6:00 PM",
  },
  {
    title: "Full Stack Conference",
    image: "/images/event5.png",
    slug: "full-stack-conference",
    location: "Boston, MA",
    date: "2025-07-18",
    time: "9:30 AM",
  },
];
