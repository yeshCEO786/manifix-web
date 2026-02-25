import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import Login from "./pages/Login";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      <Route element={<MainLayout />}>
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
