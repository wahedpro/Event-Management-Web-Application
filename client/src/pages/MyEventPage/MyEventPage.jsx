import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import MyEventCard from "../../components/MyEventCard/MyEventCard";
import UpdateModal from "../../components/UpdateModal/UpdateModal";

function MyEventPage() {
  const { user } = useContext(AuthContext);
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetch("http://localhost:5000/myEvents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      })
        .then((res) => res.json())
        .then((data) => {
          setMyEvents(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load events.");
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/events/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMyEvents((prev) => prev.filter((event) => event._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (updatedEvent) => {
    try {
      const res = await fetch(
        `http://localhost:5000/updateEvent/${updatedEvent._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEvent),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Update failed");
        return;
      }

      // UI update
      setMyEvents((prev) =>
        prev.map((ev) => (ev._id === updatedEvent._id ? updatedEvent : ev))
      );
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong.");
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading your events...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  if (myEvents.length === 0) {
    return <div className="text-center py-20">You have no events.</div>;
  }

  return (
    <>
      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myEvents.map((event) => (
          <MyEventCard
            key={event._id}
            event={event}
            onUpdate={(e) => {
              setSelectedEvent(e);
              setModalOpen(true);
            }}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {isModalOpen && selectedEvent && (
        <UpdateModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          initialData={selectedEvent}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}

export default MyEventPage;
