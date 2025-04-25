import "./App.css";
import Dashboard from "./components/Dashboard";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import LogTable from "./components/LogTable";
import Habit from "./components/Habit";
import Login from "./components/Login";
import Landingpage from "./components/LandingPage";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import EmployeeCards from "./components/Developers";
import Motivation from "./components/Motivation";
import Leaderboard from "./components/Leaderboard";
import Faq from "./components/FAQs";

function App() {
  const [loggedInUser, setLoggedInUser] = useState("");
  

  return (
    <>


      <Routes>


        <Route path='/' element={<Landingpage />} />
        <Route path={"/Login"} element={<Login setLoggedInUser={setLoggedInUser} />} />

        <Route
          path={"/dashboard"}
          element={
            loggedInUser ? (
              <Dashboard
                setLoggedInUser={setLoggedInUser}
                loggedInUser={loggedInUser}
              />
            ) : (
              // Redirect to login page if the user is not logged in
              <Login setLoggedInUser={setLoggedInUser} />
            )
          }
        />

        <Route
          path="/signup"
          element={<Signup setLoggedInUser={setLoggedInUser} />}
        />

        <Route path={"/habit"} element={<Habit />} />
        <Route path={"/logTable"} element={<LogTable />} />
        <Route path={"/developers"} element={<EmployeeCards />} />
        <Route path={"/motivation"} element={<Motivation />} />
        <Route path={"/leaderboard"} element={<Leaderboard />} />
        <Route path={"/faqs"} element={<Faq />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;