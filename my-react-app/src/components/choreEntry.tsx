import React from "react";
import { db } from "../../../firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";

interface ChoreEntryProps {
  choreCollection: { id: string; user: string; chore: string; due_date: string; status: boolean }[];
}

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
    <div className="container">
      {choreCollection.map((chore) => (
        <div key={chore.id}>
          <label>{chore.user}</label>
          <p>{chore.due_date}</p>
          <p>{chore.chore}</p>
          <button onClick={() => finishedChore(chore.id)}>Mark as Finished</button>
        </div>
      ))}
    </div>
  );
};

export default ChoreEntry;