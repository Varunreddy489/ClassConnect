import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Clubs from "./pages/Clubs";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import UserClubs from "./pages/UserClubs";
import LandingPage from "./pages/LandingPage";
import { Toaster } from "./components/ui/toaster";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Jobs from "./pages/Jobs";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/home"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/clubs"
          element={
            <Layout showSidebar={true}>
              <Clubs />
            </Layout>
          }
        />

        <Route
          path="/notifications"
          element={
            <Layout showSidebar={true}>
              <Notifications />
            </Layout>
          }
        />

        <Route
          path="/jobs"
          element={
            <Layout showSidebar={true}>
              <Jobs />
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout showSidebar={true}>
              <Profile />
            </Layout>
          }
        />

        <Route
          path="/member/clubs"
          element={
            <Layout showSidebar={true}>
              <UserClubs />
            </Layout>
          }
        />

        <Route element={<Login />} path="/login" />
        <Route element={<LandingPage />} path="/" />
        <Route element={<SignUp />} path="/signup" />
        <Route element={<ForgotPassword />} path="/forgot-password" />
        <Route element={<ResetPassword />} path="/reset-password/:token" />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
