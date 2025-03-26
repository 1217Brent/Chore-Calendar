import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import DashBoard from "./components/dashboard";
import CreateChore from "./components/createChore";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const App: React.FC = () => {
  return (
    <Router>
      <div className="d-flex">
        <div className="flex-grow-1" >
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/createchore" element={<CreateChore />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;