import { useState, useEffect } from "react";
import ChoreList from "./choreList"; // Import ChoreList component
import { fetchAllChores } from "../backend/csFirebase";
import ChoreEntryProps from "../backend/models/ChoreEntry";
import { fetchChoreByEmail } from "../backend/csFirebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

function DashBoard() {
  const [allChores, setAllChores] = useState<ChoreEntryProps>({ choreCollection: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user && user.email) {
          const chores = await fetchChoreByEmail(user.email);
          setAllChores({ choreCollection: chores });
        }
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
        backgroundColor: "#0d0d0d", 
        padding: "2px", 
      }}
    >
      <div
        className="card shadow-lg p-4 d-flex flex-column"
        style={{
          width: "90%",
          maxWidth: "1000px", 
          height: "90%",
          maxHeight: "100vh", // Ensure it doesn't go off the page
          backgroundColor: "#333", 
          color: "#ccc", //text
          border: '1px solid white',
          overflow: "hidden",
        }}
      >
        <h2 className="text-center text-light mb-4" style={{ fontSize: '2rem', fontWeight: '700' }}>Manage Your Chores Here!</h2>
        <ChoreList choreCollection={allChores.choreCollection} />
      </div>
    </div>
  );
}

export default DashBoard;