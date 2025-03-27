import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import DashBoard from "./components/dashboard";
import CreateChore from "./components/createChore";
import Login from "./components/login"; // Import the Login component
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import SignUp from "./components/signUp"; // Import the SignUp component'
import Instructions from "./components/instructions"; // Import the Instructions component
import EditChore from "./components/editChore";

const App: React.FC = () => {
  return (
    <Router>
      <div className="d-flex">
        <div className="flex-grow-1">
          <Routes>
            {/* <Route path="/" element={<Login />} /> Default route */}
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/createchore" element={<CreateChore />} />
            <Route path="/editchore/:id" element={<EditChore />} />
            <Route path="/signup" element={<SignUp />} /> {/* Add SignUp route */}
            <Route path="/instructions" element={<Instructions />} /> {/* Add Instructions route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;