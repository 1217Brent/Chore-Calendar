import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function CreateChore() {
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission
        console.log("Form submitted");
    };

    const handleBack = () => {
        navigate('/dashboard');
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={handleSubmit} className="p-5 border rounded shadow bg-light" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-5">Add Chore</h2>
                <div className="form-group mb-4">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        aria-describedby="name"
                        placeholder="Enter name"
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="chore">Chore</label>
                    <input
                        type="text"
                        className="form-control"
                        id="chore"
                        placeholder="Enter chore"
                    />
                </div>
                <div className="form-group mb-5">
                    <label htmlFor="due_date">Due Date</label>
                    <input
                        type="date"
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