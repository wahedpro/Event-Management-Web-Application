// import { NavLink } from "react-router";
// import { AuthContext } from "../../context/AuthContext";
// import { useContext } from "react";
// const Navbar = () => {
//   const { user } = useContext(AuthContext);
//   return (
//     <nav className="bg-white sticky top-0 z-10 border-b border-gray-200">
//       <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center gap-2">
//           <span className="font-bold text-xl"><NavLink to="/">NexusEvents</NavLink></span>
//         </div>

//         {/* Links */}
//         <div className="hidden md:flex gap-4 items-center">
//           <NavLink to="/" className="hover:text-indigo-600">
//             Home
//           </NavLink>
//           <NavLink to="/events" className="hover:text-indigo-600">
//             Events
//           </NavLink>
//           <NavLink to="/addevent" className="hover:text-indigo-600">
//             Add Event
//           </NavLink>
//           <NavLink to="/myevents" className="hover:text-indigo-600">
//             My Events
//           </NavLink>
//         </div>

//         {/* Right Side */}
//         <div className="relative">
//           {user ? (
//             <div className="flex items-center gap-2 cursor-pointer">
//               <img className="h-8 rounded-full hover:ring-2 hover:ring-blue-600" src={user.photoURL} alt="" />
//             </div>
//           ) : (
//             <NavLink
//               to="/login"
//               className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
//             >
//               Sign In
//             </NavLink>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white sticky top-0 z-10 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl">
            <NavLink to="/">NexusEvents</NavLink>
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex gap-4 items-center">
          <NavLink to="/" className="hover:text-indigo-600">
            Home
          </NavLink>
          <NavLink to="/events" className="hover:text-indigo-600">
            Events
          </NavLink>
          <NavLink to="/addevent" className="hover:text-indigo-600">
            Add Event
          </NavLink>
          <NavLink to="/myevents" className="hover:text-indigo-600">
            My Events
          </NavLink>
        </div>

        {/* Right Side */}
        <div className="relative">
          {user ? (
            <div className="flex items-center gap-2">
              <img
                onClick={toggleDropdown}
                className="h-8 w-8 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-600"
                src={user.photoURL}
                alt="Profile"
              />

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-36 w-48 bg-white border rounded shadow z-20">
                  <div className="px-4 py-2 text-gray-800 font-semibold">
                    {user.name}
                  </div>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
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
