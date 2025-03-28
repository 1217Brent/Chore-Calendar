import { useState, useEffect } from "react";
import ChoreList from "./choreList"; // Import ChoreList component
import { fetchAllChores } from "../backend/csFirebase";
import ChoreEntryProps from "../backend/models/ChoreEntry";

function DashBoard() {
  const [allChores, setAllChores] = useState<ChoreEntryProps>({ choreCollection: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chores = await fetchAllChores();
        setAllChores({ choreCollection: chores.choreCollection });
      } catch (error) {
        console.error("Error fetching chores:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundColor: "#0d0d0d", // Dark gray background
        padding: "2px", // Add padding to prevent the box from touching the edges
      }}
    >
      <div
        className="card shadow-lg p-4 d-flex flex-column"
        style={{
          width: "90%",
          maxWidth: "1000px", // Ensure it fits within the page
          height: "90%",
          maxHeight: "100vh", // Ensure it doesn't go off the page
          backgroundColor: "#333", // Gray inner box
          color: "#ccc", // Light gray text
          borderRadius: "16px", // Rounded corners for the box
          overflow: "hidden", // Prevent content overflow
        }}
      >
        <h2 className="text-center text-light mb-4">Dashboard</h2>
        <ChoreList choreCollection={allChores.choreCollection} />
      </div>
    </div>
  );
}

export default DashBoard;