import { useState } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import "./Register.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [Email, setEmail] = useState("");
    const [Name,setName] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [Role, setRole] = useState("");
    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Password !== ConfirmPassword) {
            toast("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('/register', {
                Name : Name,
                Email: Email,
                Password: Password,
                Role: Role
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.data.msg === "User created successfully") {
                toast(response.data.msg);
                setTimeout(() => nav("/"), 2000);
            } else {
                toast(response.data.msg);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="register-container">
            <h2>Get Started with SPAN</h2>

            <form onSubmit={handleSubmit}>
            <label>Name</label>
                <input
                    type="text"
                    name="Name"
                    placeholder="Enter your Name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Role</label>
                <select
                    name="role"
                    value={Role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value ="superAdmin">SuperAdmin</option>
                </select>

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label>Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    value={ConfirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button type="submit">Register</button>
            </form>

            <p>
                Already have an account?{' '}
                <span>
                    <Link to="/" className="link">Login</Link>
                </span>
            </p>
            <ToastContainer />
        </div>
    );
};

export default Register;
