
import { useState, useEffect } from "react";
import ChoreList from "./choreList"; // Removed NavBar import as requested
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
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh", // Full viewport height
        backgroundImage: `url(${require('../assets/background.png')})`, // Set the background image
        backgroundSize: "cover", // Cover the entire container
        backgroundPosition: "center", // Center the image
      }}
    >
      <div
        className=" p-4 shadow-lg rounded-4 d-flex flex-column"
        style={{
          width: "90%", // Keep the width smaller to ensure there's space on the sides
          maxWidth: "1000px", // Ensure it doesn't stretch too wide on larger screens
          height: "90%", // Reduced height to make the container smaller vertically
          maxHeight: "1000px", // Cap the maximum height to prevent overflowing
          backgroundColor: "#222222", // Black background for the container
          padding: "20px", // Inner padding for spacing around the content
          display: "flex", // Flexbox for layout
          flexDirection: "column", // Stack content vertically
          justifyContent: "flex-start", // Align content at the top of the container
          overflow: "hidden", // Ensure no overflow or scrolling
        }}
      >
        <ChoreList choreCollection={allChores.choreCollection} />
      </div>
    </div>
  );
}

export default DashBoard;
