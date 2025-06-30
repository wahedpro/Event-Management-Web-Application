import React from 'react'

function Testimonials() {
  return (
    <section className="bg-white py-16">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-2xl font-bold text-center mb-10">
      What Our Users Say
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Testimonial 1 */}
      <div className="border border-gray-200 rounded-lg p-6 shadow hover:shadow-md transition">
        <p className="text-gray-600 mb-4">
          "This platform made organizing my event so easy! My friends joined in no time."
        </p>
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40?img=1"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">Sarah J.</p>
            <p className="text-sm text-gray-500">Event Organizer</p>
          </div>
        </div>
      </div>
      {/* Testimonial 2 */}
      <div className="border border-gray-200 rounded-lg p-6 shadow hover:shadow-md transition">
        <p className="text-gray-600 mb-4">
          "I found so many interesting events here. Highly recommended!"
        </p>
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40?img=2"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">Mark L.</p>
            <p className="text-sm text-gray-500">Event Attendee</p>
          </div>
        </div>
      </div>
      {/* Testimonial 3 */}
      <div className="border border-gray-200 rounded-lg p-6 shadow hover:shadow-md transition">
        <p className="text-gray-600 mb-4">
          "Clean interface, easy to use, and great customer support. Love it!"
        </p>
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40?img=3"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">Emily R.</p>
            <p className="text-sm text-gray-500">Community Member</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  )
}

export default Testimonials