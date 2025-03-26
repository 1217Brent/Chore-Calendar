import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Timestamp, addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

type ChoreToCreate = {
    user: string;
    id: string;
    due_date: string; // Change to string for input handling
    status: boolean;
    chore: string;
}

function CreateChore() {
    const [choreData, setChoreData] = useState<ChoreToCreate>({
        id: "",
        user: "",
        due_date: "", // Initialize as an empty string
        chore: "",
        status: false,
    });
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
            await updateDoc(docRef, { id: docRef.id});
            alert("Successfully created chore!");
        } catch(error) {
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
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={handleSubmit} className="p-5 border rounded shadow bg-light" style={{ maxWidth: "400px", width: "100%" }}>
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
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-danger" onClick={handleBack}>
                        Back
                    </button>
                    <button type="submit" className="btn btn-dark">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateChore;