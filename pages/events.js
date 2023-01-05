import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function EventList({ events: eventList }) {
  const [events, setEvents] = useState(eventList);
  const router = useRouter();

  const fetchEventByCategory = async () => {
    const response = await fetch(
      "http://localhost:4000/events?category=sports"
    );
    const data = await response.json();

    setEvents(data);
    router.push("/events?category=sports", undefined, { shallow: true });
  };

  return (
    <>
      <h1>Events List</h1>
      <button onClick={fetchEventByCategory}>Filter</button>
      <div>
        {events.map((event) => {
          return (
            <div key={event.id}>
              <h1>
                {event.id} {event.title} - {event.category}
              </h1>
              <p>{event.description}</p>
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default EventList;

export async function getServerSideProps(context) {
  const {
    query: { category },
  } = context;
  const queryString = category ? "category=sports" : "";
  const response = await fetch(`http://localhost:4000/events?${queryString}`);
  const data = await response.json();

  return {
    props: {
      events: data,
    },
  };
}
