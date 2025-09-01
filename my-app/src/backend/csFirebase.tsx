import { collection, getDocs, deleteDoc, doc, getDoc, addDoc, query, where, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Chore from "./models/chore";
import ChoreEntryProps from "./models/ChoreEntry";
import { getAuth } from "firebase/auth";

// Fetch all chores from the Firestore database
export const fetchAllChores = async (): Promise<ChoreEntryProps> => {
    try {
        const choresCollection = collection(db, "chores");
        const querySnapshot = await getDocs(choresCollection);
        const choresList: Chore[] = querySnapshot.docs.map(doc => ({ ...doc.data() } as Chore));
        
        // Return an object that matches the ChoreEntryProps interface
        return { choreCollection: choresList };
    } catch (error) {
        console.error("Error fetching chores: ", error);
        throw error;
    }
};
export const fetchChore = async (id: string): Promise<Chore> => {
    try {
        const choresCollection = collection(db, "chores");
        const q = query(choresCollection, where("id", "==", id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Assuming there's only one document with the given id
            const docSnap = querySnapshot.docs[0];
            return { ...docSnap.data() } as Chore;
        } else {
            throw new Error("No such document!");
        }
    } catch (error) {
        console.error("Error fetching chore: ", error);
        throw error;
    }
};

export const addChore = async (id: string, due_date: Timestamp, user: string, chore: string): Promise<void> => {
    const data = {
        id: id,
        user: user,
        chore: chore,
        due_date: due_date,
        status: false,
    }
    try {
        const docRef = await addDoc(collection(db, "chores"), data);
        console.log("Successfully created new chore");
    } catch (error) {
        console.log("Failed to addChore", error);
    }
}

/**
 * Add a new chore and attach the signed-in user's email.
 * @param chore The chore object (without email).
 * @returns A promise that resolves to the added document reference.
 */
export const addChoreWithUserEmail = async (chore: Omit<Chore, "email">) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user || !user.email) {
            throw new Error("No authenticated user or email found.");
        }
        const choreWithEmail = { ...chore, email: user.email };
        const docRef = await addDoc(collection(db, "chores"), choreWithEmail);
        return docRef;
    } catch (error) {
        console.error("Error adding chore: ", error);
        throw error;
    }
}

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

// Fetch chore based on current user's email
export const fetchChoreByEmail = async (email: string): Promise<Chore[]> => {
    try {
        const choresCollection = collection(db, "chores");
        const q = query(choresCollection, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        const chores: Chore[] = [];
        querySnapshot.forEach((doc) => {
            chores.push({ ...doc.data(), id: doc.id } as Chore);
        });
        return chores;
    } catch (error) {
        console.error("Error fetching chores by email: ", error);
        throw error;
    }
};