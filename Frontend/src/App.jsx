import "./App.css";
import Project from "./component/project/Project";
import Login from "./pages/Login";
import CreateProject from "./component/project/CreateProject";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useLoadUserQuery } from "./redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";
import { useEffect } from "react";

function App() {
  const response = useLoadUserQuery();
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(setUser(response.data));
  }, [dispatch, response.data]);
  
  const {user,isAuthenticated ,loading }= useSelector((state) => state.user);
  const isAdmin = (user)=> {
    if (user && user.role === "admin") return true;
    return false;
  }
  
  // console.log(isAdmin(user), user ,response);

  const routes = [
    {
      path: "/",
      element: <div>Home</div>,
    },
    {
      path: "/create",
      element: <div>About</div>,
    },
    {
      path: "/project",
      element: <Project />,
    },
    {
      path: "/create-project",
      element: (
        <ProtectedRoute isAdmin={true}>
          <CreateProject />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
  ];

  return (
    <>
      <Header user={user} />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
