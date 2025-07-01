import { useEffect, useState } from "react";
import EventCard from "../../components/EventCard/EventCard";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("");

  useEffect(() => {
    fetch("https://server-sable-sigma.vercel.app/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const filteredEvents = events
    .filter((event) => {
      const titleMatch = event.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      let filterMatch = true;
      const eventDate = new Date(event.date);
      const now = new Date();

      if (filterOption === "today") {
        filterMatch = eventDate.toDateString() === now.toDateString();
      } else if (filterOption === "thisWeek") {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);
        filterMatch = eventDate >= startOfWeek && eventDate <= endOfWeek;
      } else if (filterOption === "lastWeek") {
        const startOfLastWeek = new Date(now);
        startOfLastWeek.setDate(now.getDate() - now.getDay() - 7);
        startOfLastWeek.setHours(0, 0, 0, 0);
        const endOfLastWeek = new Date(startOfLastWeek);
        endOfLastWeek.setDate(startOfLastWeek.getDate() + 6);
        endOfLastWeek.setHours(23, 59, 59, 999);
        filterMatch = eventDate >= startOfLastWeek && eventDate <= endOfLastWeek;
      } else if (filterOption === "thisMonth") {
        filterMatch =
          eventDate.getMonth() === now.getMonth() &&
          eventDate.getFullYear() === now.getFullYear();
      } else if (filterOption === "lastMonth") {
        const lastMonth = new Date(now);
        lastMonth.setMonth(now.getMonth() - 1);
        filterMatch =
          eventDate.getMonth() === lastMonth.getMonth() &&
          eventDate.getFullYear() === lastMonth.getFullYear();
      }

      return titleMatch && filterMatch;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Descending order

  if (loading) {
    return <div className="text-center py-20">Loading Events...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">All Events</h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 border border-gray-200 p-4 rounded">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/3"
        />
        <select
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/4"
        >
          <option value="">All Dates</option>
          <option value="today">Today</option>
          <option value="thisWeek">This Week</option>
          <option value="lastWeek">Last Week</option>
          <option value="thisMonth">This Month</option>
          <option value="lastMonth">Last Month</option>
        </select>
      </div>

      {filteredEvents.length === 0 ? (
        <p className="text-center">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
