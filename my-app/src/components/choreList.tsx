import React from "react";
import { db } from "../firebaseConfig";
import { updateDoc, getDocs, query, collection, where, Timestamp } from "firebase/firestore";
import Chore from "../backend/models/chore";
import ChoreEntryProps from "../backend/models/ChoreEntry";
import { useNavigate } from "react-router-dom";
import obfuscateId from "../functions/obfuscate";
import NavBar from "./navBar";

const ChoreList: React.FC<ChoreEntryProps> = ({ choreCollection }) => {
  const navigate = useNavigate();

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
        window.location.reload();
      } else {
        alert("No such document!");
      }
    } catch (error) {
      console.error("Error updating chore status:", error);
      alert("Could not update chore status!");
    }
  };

  function handleEdit(choreId: string) {
    try {
      const obfuscatedId = obfuscateId(choreId);
      navigate(`/editchore/${obfuscatedId}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="d-flex" style={{ height: "76vh", borderRadius: 4 }}>
      <NavBar />
      <div className="flex-grow-1 d-flex flex-column p-5" style={{ backgroundColor: "#222222" }}>
        <div className="d-flex justify-content-center align-items-center">
          <div className="w-100 bg-dark p-4 rounded-4 shadow-sm" style={{ maxWidth: "900px" }}>
            <div style={{ height: "725px", overflowY: "auto" }}>
              {choreCollection.length === 0 ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
                  <h3 className="text-secondary">so empty...</h3>
                </div>
              ) : (
                choreCollection.map((chore: Chore) => (
                  <div
                    key={chore.id}
                    className={`p-3 d-flex flex-row align-items-center justify-content-between mb-3 rounded-4 shadow-sm ${
                      chore.status ? "bg-success" : "bg-danger"
                    } text-white`}
                  >
                    <div>
                      <p className="fw-bold mb-1">{chore.user}</p>
                      <p className="small mb-0">
                        {chore.due_date instanceof Timestamp
                          ? chore.due_date.toDate().toLocaleDateString()
                          : "No due date"}
                      </p>
                      <p>{chore.chore}</p>
                    </div>
                    <div className="d-flex gap-2">
                      <button onClick={() => handleEdit(chore.id)} className="btn btn-outline-light rounded-pill">
                        Edit
                      </button>
                      <button onClick={() => finishedChore(chore.id)} className="btn btn-outline-light rounded-pill">
                        {chore.status ? "Finished" : "Mark as Finished"}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChoreList;
