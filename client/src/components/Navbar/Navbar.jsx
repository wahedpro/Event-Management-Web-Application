import { NavLink } from "react-router";
const Navbar = () => {
  const user = true;
  return (
    <nav className="bg-white sticky top-0 z-10 border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl">NexusEvents</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex gap-4 items-center">
          <NavLink to="/" className="hover:text-indigo-600">
            Home
          </NavLink>
          <NavLink to="/events" className="hover:text-indigo-600">
            Events
          </NavLink>
          <NavLink to="/add-event" className="hover:text-indigo-600">
            Add Event
          </NavLink>
          <NavLink to="/my-events" className="hover:text-indigo-600">
            My Events
          </NavLink>
        </div>

        {/* Right Side */}
        <div className="relative">
          {user ? (
            <div className="flex items-center gap-2 cursor-pointer">
              <h1>hi</h1>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
            >
              Sign In
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
