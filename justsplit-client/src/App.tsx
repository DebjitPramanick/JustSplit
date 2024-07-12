import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignUpPage from "~/pages/Auth/SignUpPage";
import LoginPage from "./pages/Auth/LoginPage";
import DashboardPage from "./pages/Dashboard";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { UserProvider } from "./hooks/useUser";
import GroupExpensesPage from "./pages/GroupExpenses";
import FriendExpensesPage from "./pages/FriendExpenses";

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
          <Route path="/expenses" element={<ProtectedRoute />}>
            <Route
              path="/expenses/group/:groupId"
              element={<GroupExpensesPage />}
            />
            <Route
              path="/expenses/friend/:userId"
              element={<FriendExpensesPage />}
            />
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
