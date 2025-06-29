import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage/HomePage";
import EventsPage from "../pages/EventsPage/EventsPage";
import MyEventPage from "../pages/MyEventPage/MyEventPage";
import AddEventPage from "../pages/AddEventPage/AddEventPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path:"events",
        element:<EventsPage/>
      },
      {
        path: "myevents",
        element: <MyEventPage/>
      },
      {
        path: "addevent",
        element: <AddEventPage/>
      },
      {
        path: "login",
        element:<LoginPage/>
      },
      {
        path: "register",
        element: <RegistrationPage/>
      }
    ],
  },
]);

export default router;
