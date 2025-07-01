import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const EventCard = ({ event }) => {
  const { user } = useContext(AuthContext);
  const [joined, setJoined] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(event.attendeeCount);

  useEffect(() => {
    if (user && event.joinedUsers?.includes(user.email)) {
      setJoined(true);
    }
  }, [user, event]);

  const handleJoin = async () => {
    
    if (joined) {
      return;
    }

    try {
      const res = await fetch("https://server-sable-sigma.vercel.app/joinEvent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event._id,
          email: user.email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.message.includes("already")) {
          setJoined(true);
        }
        return;
      }
      setJoined(true);
      setAttendeeCount((prev) => prev + 1);
    } catch (err) {
      console.error("Join error:", err);
    }
  };

  return (
    <div className="bg-white border border-gray-200 shadow rounded p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold mb-1">{event.title}</h3>
        <p className="text-sm text-gray-600 mb-2">Posted by: {event.name}</p>
        <p className="text-sm mb-2">
          <span className="font-medium">Date:</span>{" "}
          {new Date(event.date).toLocaleDateString()}{" "}
          {new Date(event.date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p className="mb-2">
          <span className="font-medium">Location:</span> {event.location}
        </p>
        <p className="text-gray-700 mb-3">{event.description}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm">👥 {attendeeCount} Attending</p>
        <button
          disabled={joined}
          onClick={handleJoin}
          className={`${
            joined
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          } text-white px-3 py-1 rounded text-sm`}
        >
          {joined ? "Joined" : "Join Event"}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
