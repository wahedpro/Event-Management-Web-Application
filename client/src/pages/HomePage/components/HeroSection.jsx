import { NavLink,  } from "react-router-dom";

function HeroSection() {
  return (
    <section className="bg-indigo-600 text-white py-20 text-center">
  <h1 className="text-3xl md:text-5xl font-bold mb-4">
    Discover and Join Amazing Events
  </h1>
  <p className="mb-6">Organize, share, and join events seamlessly</p>
  <div className="flex justify-center gap-4">
    <NavLink
      to="/events"
      className="bg-white text-indigo-600 px-4 py-2 rounded font-medium"
    >
      Browse Events
    </NavLink>
    <NavLink
      to="/addevent"
      className="border border-white px-4 py-2 rounded font-medium"
    >
      Add Your Event
    </NavLink>
  </div>
</section>

  )
}

export default HeroSection