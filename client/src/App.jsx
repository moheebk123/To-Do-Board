import { lazy, Suspense, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { NotFound, NotAllowed } from "./pages";
import { Loader, AlertBox } from "./components";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { authService } from "./api";
import { userDataActions } from "./store";

// Import Pages Through Lazy Loading
const Home = lazy(() => import("./pages/Home.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));

const LayoutHandler = () => {
  const { isAuthenticated } = useSelector((store) => store.userData);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    const authPath = path.split("/");
    const hashPath = path[path.length - 1] === "#" ? true : false;

    if (hashPath) {
      navigate("/");
    }
    if (authPath[authPath.length - 1] === "auth") {
      navigate("/auth/login");
    }
  }, [location, navigate]);

  return (
    <Suspense fallback={<Loader />}>
      <AlertBox />
      <Routes>
        {/* Normal Routes for All Visitors */}
        <Route path="/not-allowed" element={<NotAllowed />} />
        <Route path="*" element={<NotFound />} />

        {/* Protected Routes for Not Logged Users */}
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              isUserAllowed={false}
            />
          }
        >
          <Route
            path="register"
            element={isAuthenticated ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
        </Route>

        {/* Protected Routes for Logged Users */}
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              isUserAllowed={true}
            />
          }
        >
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

const App = () => {
  const { isCheckingAuth } = useSelector((store) => store.userData);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authService.checkAuth();
        if (response.success) {
          dispatch(userDataActions.updateUser(response.user));
        } else {
          dispatch(userDataActions.updateUser(undefined));
        }
      } catch {
        dispatch(userDataActions.updateUser(undefined));
      }
    };
    checkAuth();
  }, [dispatch]);

  return isCheckingAuth ? (
    <Loader />
  ) : (
    <Router>
      <LayoutHandler />
    </Router>
  );
};

export default App;
