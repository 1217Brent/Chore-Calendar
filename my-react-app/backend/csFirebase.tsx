import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../src/firebaseConfig";
import Chore from "./models/chore";

// Fetch all chores from the Firestore database
export const fetchAllChores = async (): Promise<Chore[]> => {
    try {
        const choresCollection = collection(db, "chores");
        const querySnapshot = await getDocs(choresCollection);
        const choresList: Chore[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Chore));
        return choresList;
    } catch (error) {
        console.error("Error fetching chores: ", error);
        throw error;
    }
};
//deletes all chores
export const deleteAllChores = async (): Promise<void> => {
    try {
        const choresCollection = collection(db, "chores");
        const querySnapshot = await getDocs(choresCollection);
        
        const deletePromises = querySnapshot.docs.map(choreDoc => {
            const choreDocRef = doc(db, "chores", choreDoc.id);
            return deleteDoc(choreDocRef);
        });

        await Promise.all(deletePromises);
        console.log("All chores deleted successfully.");
    } catch (error) {
        console.error("Error deleting all chores: ", error);
        throw error;
    }
};

// Delete a specific chore from the Firestore database
export const deleteChore = async (choreId: string): Promise<void> => {
    try {
        const choreDocRef = doc(db, "chores", choreId);
        await deleteDoc(choreDocRef);
        console.log(`Chore with ID ${choreId} deleted successfully.`);
    } catch (error) {
        console.error("Error deleting chore: ", error);
        throw error;
    }
};