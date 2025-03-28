import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Import Firebase auth

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log(`Logged in with email: ${email}`);
            navigate('/dashboard'); // Redirect to dashboard
        } catch (err: any) {
            console.error("Login error:", err.message);
            setError("Invalid email or password. Please try again.");
        }
    };

    const handleSignUp = () => {
        navigate('/signup'); // Redirect to sign-up page
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{ backgroundColor: '#0d0d0d', flexDirection: 'column' }} // Dark gray outer background
        >
            {/* Login Container */}
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
                <h1 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: '700' }}>
                    LOGIN
                </h1>

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                backgroundColor: '#444', // Dark gray input
                                color: '#ccc',
                                border: 'none',
                                padding: '10px 15px',
                                marginBottom: '10px',
                                borderRadius: '8px', // Rounded border
                            }}
                        />
                    </div>
                    <div className="mb-5">
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                backgroundColor: '#444',
                                color: '#ccc',
                                border: 'none',
                                padding: '10px 15px',
                                marginBottom: '10px',
                                borderRadius: '8px',
                            }}
                        />
                    </div>

                    {error && (
                        <p className="text-danger" style={{ textAlign: 'center' }}>
                            {error}
                        </p>
                    )}

                    <div className="d-flex justify-content-between mb-4">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{
                                width: '100%',
                                backgroundColor: '#007bff',
                                padding: '10px 0',
                                fontWeight: '500',
                                borderRadius: '8px', // Rounded button
                            }}
                        >
                            LOGIN
                        </button>
                    </div>
                </form>
            </div>

            {/* "Don’t have an account? Sign Up" */}
            <div
                className="p-4"
                style={{
                    maxWidth: '400px',
                    width: '100%',
                    backgroundColor: '#333', // Dark inner box
                    color: '#ccc',
                    borderRadius: '8px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
                    textAlign: 'center',
                    marginTop: '10px',
                    border: '1px solid white', // Thicker border with the same color as the login container
                }}
            >
                <p className="mb-0" style={{ color: '#ccc' }}>
                    Don’t have an account?{' '}
                    <span
                        onClick={handleSignUp}
                        style={{
                            textDecoration: 'underline',
                            color: '#007bff',
                            cursor: 'pointer',
                        }}
                    >
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
