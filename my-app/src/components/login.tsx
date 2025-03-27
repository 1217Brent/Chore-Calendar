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
            style={{ backgroundColor: '#0d0d0d', flexDirection: 'column' }} // Stack vertically
        >
            {/* Login Container */}
            <div
                className="p-4 mb-3"
                style={{
                    maxWidth: '400px',
                    width: '100%',
                    backgroundColor: '#1c1c1c', // Dark box
                    borderRadius: '8px',
                    color: '#ccc',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
                }}
            >
                <h1 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: '700', color: '#fff' }}>
                    LOGO
                </h1>

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                backgroundColor: '#333',
                                color: '#ccc',
                                border: '1px solid #555', // Darker border
                                padding: '10px 15px',
                                marginBottom: '10px',
                                borderRadius: '4px',
                            }}
                            // Adjust placeholder text color to match border
                            onFocus={(e) => e.target.setAttribute('placeholder', '')}
                            onBlur={(e) => e.target.setAttribute('placeholder', 'Username')}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                backgroundColor: '#333',
                                color: '#ccc',
                                border: '1px solid #555', // Darker border
                                padding: '10px 15px',
                                marginBottom: '10px',
                                borderRadius: '4px',
                            }}
                            // Adjust placeholder text color to match border
                            onFocus={(e) => e.target.setAttribute('placeholder', '')}
                            onBlur={(e) => e.target.setAttribute('placeholder', 'Password')}
                        />
                    </div>
                    {error && <p className="text-danger">{error}</p>}

                    <div className="d-flex justify-content-center mb-4">
                        <button type="submit" className="btn btn-primary" style={{
                            width: '100%',
                            backgroundColor: '#007bff',
                            padding: '10px 0',
                            fontWeight: '500',
                        }}>
                            LOGIN
                        </button>
                    </div>
                </form>
            </div>

            {/* "Don’t have an account? Sign Up" Container */}
            <div
                className="p-4"
                style={{
                    maxWidth: '400px',
                    width: '100%',
                    backgroundColor: '#1c1c1c', // Dark box
                    color: '#ccc',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
                    textAlign: 'center',
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
