import React from "react";
import { db } from "../firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import Chore from "../backend/models/chore";
import ChoreEntryProps from "../backend/models/ChoreEntry";

const ChoreEntry: React.FC<ChoreEntryProps> = ({ choreCollection }) => {
  const finishedChore = async (choreId: string) => {
    try {
      const choreRef = doc(db, "chores", choreId);
      const choreDoc = await getDoc(choreRef);
      if (choreDoc.exists()) {
        const choreData = choreDoc.data();
        if (choreData.status === false) {
          await updateDoc(choreRef, { status: true });
          alert("Chore marked as finished!");
        } else {
          alert("You already finished it!");
        }
      }
    } catch (err) {
      console.log("Finished Chore Function Error", err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="container bg-white p-4 border border-light rounded shadow"
        style={{
          width: "75%",
          maxWidth: "1200px",
        }}
      >
        {choreCollection.map((chore: Chore) => (
          <div
            key={chore.id}
            className="mb-3 p-3 border rounded bg-light d-flex flex-column"
            style={{ height: "200px" }}
          >
            <div>
              <label className="h5">{chore.user}</label>
              <p>{chore.due_date}</p>
              <p>{chore.chore}</p>
            </div>
            <button>Edit Chore</button>
            <button
              onClick={() => finishedChore(chore.id)}
              className="btn"
              style={{
                backgroundColor: chore.status ? "green" : "#1c1f26",
                color: "white",
                borderRadius: "12px",
                padding: "10px 20px",
                marginTop: "auto",
                cursor: chore.status ? "not-allowed" : "pointer",
              }}
            >
              {chore.status ? "Finished" : "Mark as Finished"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChoreEntry;