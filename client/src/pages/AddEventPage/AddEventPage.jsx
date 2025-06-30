import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const AddEventPage = () => {

  const {user} = useContext(AuthContext)

  const handleAddEvent = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const name = event.target.name.value;
    const date = event.target.date.value;
    const location = event.target.location.value;
    const description = event.target.description.value;
    const attendeeCount = 0;
    const email= user.email;


    const newEvent = {
      title,
      name,
      date,
      location,
      description,
      attendeeCount,
      email,
    };

    // Backend API call
    fetch("http://localhost:5000/addEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          event.target.reset();
        } else {
          alert("Failed to add event.");
        }
      })
      .catch((error) => {
        alert("Something went wrong.");
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Event</h2>
      <form
        onSubmit={handleAddEvent}
        className="bg-white p-6 shadow rounded space-y-4"
      >
        {/* Event Title */}
        <div>
          <label className="block mb-1 font-semibold">Event Title</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            name="title"
            type="text"
            placeholder="Enter event title"
            required
          />
        </div>

        {/* Name */}
        <div>
          <label className="block mb-1 font-semibold">Name (Who Posted)</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            name="name"
            type="text"
            placeholder="Your name"
            required
          />
        </div>

        {/* Date and Time */}
        <div>
          <label className="block mb-1 font-semibold">Date and Time</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            name="date"
            type="datetime-local"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-semibold">Location</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            name="location"
            type="text"
            placeholder="Event location"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2"
            name="description"
            rows="3"
            placeholder="Event description"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEventPage;
