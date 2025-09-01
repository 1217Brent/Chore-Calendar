import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Timestamp, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { fetchChore } from "../backend/csFirebase";
import { deleteChore } from "../backend/csFirebase";

type ChoreToEdit = {
    user: string;
    id: string;
    due_date: string;
    status: boolean;
    chore: string;
};

function EditChore() {
    const [choreData, setChoreData] = useState<ChoreToEdit>({
        id: "",
        user: "",
        due_date: "",
        chore: "",
        status: false,
    });
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const decodedId = id ? atob(id) : null;

    useEffect(() => {
        const fetchTheChore = async () => {
            if (decodedId) {
                try {
                    const fetchedChore = await fetchChore(decodedId);
                    setChoreData({
                        ...fetchedChore,
                        due_date: fetchedChore.due_date instanceof Timestamp
                            ? fetchedChore.due_date.toDate().toISOString().split('T')[0]
                            : new Date(fetchedChore.due_date).toISOString().split('T')[0],
                    });
                } catch (error) {
                    console.error(error);
                }
            } else {
                alert("Invalid Chore Id");
                navigate('/dashboard');
            }
        };
        fetchTheChore();
    }, [decodedId, navigate]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const choreToSubmit = {
            ...choreData,
            due_date: Timestamp.fromDate(new Date(choreData.due_date)),
        };
        try {
            const docRef = doc(db, "chores", decodedId!);
            await updateDoc(docRef, choreToSubmit);
            alert("Successfully updated chore!");
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert("Failed to update chore");
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
                <h2 className="text-center mb-5">Edit Chore</h2>
                <div className="form-group mb-4">
                    <label htmlFor="user">Name</label>
                    <input
                        type="text"
                        name="user"
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
                        name="chore"
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
                        name="due_date"
                        value={choreData.due_date}
                        onChange={handleChange}
                        className="form-control"
                        id="due_date"
                        placeholder="Select date"
                        style={{ backgroundColor: '#444', color: '#ccc', border: 'none' }} // Styled input
                    />
                </div>
                <div className="d-flex justify-content-between mb-3">
                    <button type="button" className="btn btn-danger" onClick={handleBack}>
                        Back
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={async () => {
                            if (decodedId) {
                                try {
                                    await deleteChore(decodedId);
                                    alert("Chore deleted successfully!");
                                    navigate('/dashboard');
                                } catch (error) {
                                    console.error(error);
                                    alert("Failed to delete chore");
                                }
                            }
                        }}
                    >
                        Delete Chore
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditChore;