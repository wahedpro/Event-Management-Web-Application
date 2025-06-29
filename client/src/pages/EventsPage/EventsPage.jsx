// EventsPage
import { useEffect, useState } from "react";
import EventCard from "../../components/EventCard/EventCard";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("");

  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  // search filter
  const filteredEvents = events.filter((event) => {
    const titleMatch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    let filterMatch = true;
    const eventDate = new Date(event.date);
    const now = new Date();

    if (filterOption === "today") {
      filterMatch = eventDate.toDateString() === now.toDateString();
    } else if (filterOption === "week") {
      const startOfWeek = new Date();
      startOfWeek.setDate(now.getDate() - now.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      filterMatch = eventDate >= startOfWeek && eventDate <= endOfWeek;
    } else if (filterOption === "month") {
      filterMatch =
        eventDate.getMonth() === now.getMonth() &&
        eventDate.getFullYear() === now.getFullYear();
    }

    return titleMatch && filterMatch;
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">All Events</h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 border border-gray-200">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-r border-gray-300 rounded px-3 py-2 w-full md:w-1/3"
        />

        {/* Filter */}
        <select
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
          className="border-l border-gray-300 rounded px-3 py-2 w-full md:w-1/4"
        >
          <option value="">All Dates</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Event Cards */}
      {filteredEvents.length === 0 ? (
        <p className="text-center">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;