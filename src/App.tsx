import { Route, Routes } from "react-router-dom";

import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Clubs from "./pages/Clubs";
import Events from "./pages/Events";
import SignUp from "./pages/SignUp";
import Layout from "./layout/Layout";
import Profile from "./pages/Profile";
import Network from "./pages/Network";
import Dashboard from "./pages/Dashboard";
import UserClubs from "./pages/UserClubs";
import LandingPage from "./pages/LandingPage";
import { Toaster } from "./components/ui/toaster";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Notifications from "./pages/Notifications";
import Student from "./pages/Student";

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
          path="/network"
          element={
            <Layout showSidebar={true}>
              <Network />
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
        <Route
          path="/events"
          element={
            <Layout showSidebar={true}>
              <Events />
            </Layout>
          }
        />

        <Route
          element={
            <Layout showSidebar={true}>
              <Student />
            </Layout>
          }
          path="/profile/:studentId"
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
