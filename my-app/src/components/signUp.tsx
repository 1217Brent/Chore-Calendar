import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Import Firebase auth
import { db } from "../firebaseConfig"; // Import Firestore
import { doc, setDoc } from "firebase/firestore"; // Firestore methods

// show error messages in the component

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<String>("");
  const errorMessages: Record<string, string> = {
    "auth/email-already-in-use": "This email is already in use.",
    "auth/invalid-email": "Invalid email address.",
    "auth/weak-password": "Password must be at least 6 characters long.",
  };

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setErrorMessage("");
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setError(false);
    setErrorMessage("");
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Get the user ID
      const userId = userCredential.user.uid;

      // Save user details to Firestore
      await setDoc(doc(db, "users", userId), {
        name: formData.name,
        email: formData.email,
        createdAt: new Date(),
      });
      // Redirect to the login page after successful sign-up
      navigate("/");
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      setError(true);
      const err = errorMessages[error.code] || "Something Happened. Please Try Again";
      setErrorMessage(err);
    }
  };

  const handleBack = () => {
    navigate("/"); // Redirect to the main page
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#0d0d0d" }} // Dark gray outer background
    >
      <div
        className="p-5 border rounded shadow-lg"
        style={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: '#333', // Gray inner box
          color: '#ccc', // Light gray text
          borderRadius: '8px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)', // Enhanced shadow
          border: '2px solid #555', // Thicker border for the login container
        }}
      >
        <h2
          className="text-center mb-4"
          style={{
        color: "#fff",
        letterSpacing: "1px",
        fontWeight: "bold", // Make text bold
        fontSize: "2rem",   // Optionally increase font size for emphasis
          }}
        >
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {errorMessage}
        </div>
          )}
          <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-control"
          style={{ backgroundColor: "#444", color: "#ccc", border: "none" }}
        />
          </div>
          <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
          style={{ backgroundColor: "#444", color: "#ccc", border: "none" }}
        />
          </div>
          <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          required
          onChange={handleChange}
          className="form-control"
          style={{ backgroundColor: "#444", color: "#ccc", border: "none" }}
        />
          </div>
          <div className="mb-4">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          className="form-control"
          style={{ backgroundColor: "#444", color: "#ccc", border: "none" }}
        />
          </div>
          <div className="d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleBack}
        >
          Back
        </button>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
