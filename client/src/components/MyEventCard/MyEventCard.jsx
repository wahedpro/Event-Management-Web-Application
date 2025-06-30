const MyEventCard = ({ event, onUpdate, onDelete }) => {
  return (
    <div className="bg-white border border-gray-200 shadow rounded p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold mb-1">{event.title}</h3>
        <p className="text-sm text-gray-600 mb-2">Posted by: {event.name || "Unknown"}</p>
        <p className="text-sm mb-2">
          <span className="font-medium">Date:</span>{" "}
          {new Date(event.date).toLocaleDateString()}{" "}
          {new Date(event.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
        <p className="mb-2">
          <span className="font-medium">Location:</span> {event.location}
        </p>
        <p className="text-gray-700 mb-3">{event.description}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm">👥 {event.attendeeCount} Attending</p>
        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
            onClick={() => onUpdate(event)}
          >
            Update
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            onClick={() => onDelete(event._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyEventCard;