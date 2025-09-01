import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Timestamp, addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";

const auth = getAuth();

type ChoreToCreate = {
    user: string;
    id: string;
    due_date: string; // Change to string for input handling
    status: boolean;
    chore: string;
    email: string;
};

function CreateChore() {
    const [choreData, setChoreData] = useState<ChoreToCreate>({
        id: "",
        user: "",
        due_date: "", // Initialize as an empty string
        chore: "",
        status: false,
        email: "",
    });

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setChoreData((prev) => ({
                ...prev,
                email: user?.email ?? "",
            }));
        });
        return () => unsubscribe();
    }, []);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission
        const choreToSubmit = {
            ...choreData,
            due_date: Timestamp.fromDate(new Date(choreData.due_date)), // Convert to Timestamp
        };
        console.log("Form submitted", choreToSubmit);
        try {
            const docRef = await addDoc(collection(db, "chores"), choreToSubmit);
            await updateDoc(docRef, { id: docRef.id });
            alert("Successfully created chore!");
        } catch (error) {
            console.log(error);
            alert("Failed to add chore");
        }
    };

    const handleBack = () => {
        navigate('/dashboard');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setChoreData({
            ...choreData,
            [name]: value,
        });
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{ backgroundColor: '#0d0d0d' }} // Dark gray outer background
        >
            <form
                onSubmit={handleSubmit}
                className="p-5 border rounded shadow-lg"
                style={{
                    maxWidth: "400px",
                    width: "100%",
                    backgroundColor: '#333', // Gray inner box
                    color: '#ccc', // Light gray text
                    borderRadius: '8px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)', // Enhanced shadow
                }}
            >
                <h2 className="text-center mb-5">Add Chore</h2>
                <div className="form-group mb-4">
                    <label htmlFor="user">Name</label>
                    <input
                        type="text"
                        name="user" // Use name attribute
                        value={choreData.user}
                        onChange={handleChange}
                        className="form-control"
                        id="user"
                        placeholder="Enter name"
                        style={{ backgroundColor: '#444', color: '#ccc', border: 'none' }} // Styled input
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="chore">Chore</label>
                    <input
                        type="text"
                        name="chore" // Use name attribute
                        value={choreData.chore}
                        onChange={handleChange}
                        className="form-control"
                        id="chore"
                        placeholder="Enter chore"
                        style={{ backgroundColor: '#444', color: '#ccc', border: 'none' }} // Styled input
                    />
                </div>
                <div className="form-group mb-5">
                    <label htmlFor="due_date">Due Date</label>
                    <input
                        type="date"
                        name="due_date" // Use name attribute
                        value={choreData.due_date}
                        onChange={handleChange}
                        className="form-control"
                        id="due_date"
                        placeholder="Select date"
                        style={{ backgroundColor: '#444', color: '#ccc', border: 'none' }} // Styled input
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-danger" onClick={handleBack}>
                        Back
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateChore;