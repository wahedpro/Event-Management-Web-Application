import { useState, useEffect } from "react";

const UpdateModal = ({ isOpen, onClose, initialData, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    if (initialData) {
      const isoDate = new Date(initialData.date);
      const formattedDate = isoDate.toISOString().slice(0, 16);

      setFormData({
        title: initialData.title || "",
        location: initialData.location || "",
        description: initialData.description || "",
        date: formattedDate,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEvent = {
      ...initialData,
      ...formData,
      date: new Date(formData.date).toISOString(),
    };

    onUpdate(updatedEvent);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Blurred Overlay */}
      <div
        className="absolute inset-0 backdrop-blur-sm bg-white/10"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-white rounded-lg shadow-lg max-w-md w-full p-6 border border-gray-300 z-50"
      >
        <h2 className="text-xl font-semibold mb-4">Update Event</h2>

        <div className="space-y-3">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Title"
            className="border p-2 w-full rounded"
          />
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Location"
            className="border p-2 w-full rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateModal;