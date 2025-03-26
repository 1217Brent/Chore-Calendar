import React from "react";
import { db } from "../firebaseConfig";
import { doc, updateDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import Chore from "../backend/models/chore";
import ChoreEntryProps from "../backend/models/ChoreEntry";

const ChoreList: React.FC<ChoreEntryProps> = ({ choreCollection }) => {
  const finishedChore = async (id: string) => {
    try {
      const choresCollection = collection(db, "chores");
      const q = query(choresCollection, where("id", "==", id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        const choreRef = docSnap.ref;
        await updateDoc(choreRef, { status: true });

        alert("Chore marked as finished!");
      } else {
        alert("No such document!");
      }
    } catch (error) {
      console.error("Error updating chore status:", error);
      alert("Could not update chore status!");
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-secondary">
    <div className="container bg-light p-4 border border-light rounded shadow" style={{ width: "75%", maxWidth: "1200px" }}>
      <h2 className="mb-4 text-center">All Chores To Be Completed</h2>
      <div
        style={{
          height: "600px", // Fixed height
          overflowY: "auto", // Enables scrolling
        }}
      >
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="container bg-white p-4 border border-light rounded shadow"
        style={{
          width: "75%",
          maxWidth: "1200px",
          height: "600px", // Fixed height for scrolling
          overflowY: "auto", // Enables scrolling
        }}
      >
        {choreCollection.map((chore: Chore) => (
          <div
            key={chore.id}
            className="p-3 border rounded bg-light d-flex align-items-center"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            {/* Chore Details - Flex row layout */}
            <div
              className="d-flex"
              style={{
                flex: 1, // Makes sure the text section grows naturally
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <p className="mb-0" style={{ minWidth: "150px", textAlign: "left" }}>
                <strong>{chore.user}</strong>
              </p>
              <p className="mb-0" style={{ minWidth: "120px", textAlign: "left" }}>
                {chore.due_date}
              </p>
              <p className="mb-0" style={{ flex: 1, textAlign: "left" }}>{chore.chore}</p>
            </div>

            {/* Buttons Section */}
            <div className="d-flex" style={{ gap: "10px", minWidth: "220px" }}>
              <button className="btn btn-secondary">Edit</button>
              <button
                onClick={() => finishedChore(chore.id)}
                className="btn"
                style={{
                  backgroundColor: chore.status ? "green" : "#1c1f26",
                  color: "white",
                  borderRadius: "12px",
                  padding: "5px 15px",
                  cursor: chore.status ? "not-allowed" : "pointer",
                }}
              >
                {chore.status ? "Finished" : "Mark as Finished"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
      </div>
    </div>
  );
};

export default ChoreList;
