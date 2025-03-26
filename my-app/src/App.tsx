import React, { useEffect, useState } from "react";
import ChoreEntry from "./components/choreEntry";
import { fetchAllChores } from "./backend/csFirebase";
import Chore from "./backend/models/chore"; // Assuming Chore is defined here
import ChoreEntryProps from "./backend/models/ChoreEntry";
import NavBar from "./components/navBar";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import DashBoard from "./components/dashboard";

const App: React.FC = () => {
  return <DashBoard />;
};

export default App;
