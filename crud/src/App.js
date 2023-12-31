import "./App.css";
import MainHeader from "./MainDisplayPage/MainDisplay.js";
import SingleData from "./SingleUserData/SingleData.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddItem from "./UserForm/AddItem";
import Login from "./Login/Login";
import { useState } from "react";
import ResetPassword from "./Login/ResetPassword";
import SetPassword from "./Login/SetPassword";

function App() {
  const [logIdn, setlogIdn] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login logIdn={logIdn} setlogIdn={setlogIdn} />,
    },
    {
      path: "/display",
      element: <MainHeader logIdn={logIdn} />,
    },
    {
      path: "/additem",
      element: <AddItem logIdn={logIdn} />,
    },
    {
      path: "/single",
      element: <SingleData logIdn={logIdn} />,
    },
    {
      path: "/resetPassword",
      element: <SetPassword/>,
    },
    {
      path: "/setPassword",
      element: <SetPassword/>,
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
