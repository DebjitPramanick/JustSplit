import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignUpPage from "~/pages/auth/SignUpPage";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/dashboard";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { UserProvider } from "./hooks/useUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <UserProvider>
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardPage />} />
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
