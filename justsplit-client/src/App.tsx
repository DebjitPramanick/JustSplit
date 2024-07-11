import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignUpPage from "~/pages/auth/SignUpPage";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/dashboard";
import ProtectedRoute from "./components/routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
