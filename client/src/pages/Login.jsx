import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/ApiEndPoints";
import {toast} from "react-hot-toast";
import { useDispatch } from "react-redux";
import { SetUser } from "../redux/authSlice";


export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const request = await post('/api/auth/login', {email, password});
            const response = request.data;
            if(request.status == 200) {
                if(response.user.role == 'admin') {
                    navigate('/admin');
                }else if(response.user.role == 'user') {
                    navigate('/');
                }
                toast.success(response.message);
                dispatch(SetUser(response.user))
            }
        } catch (error) {
            console.log(error);
        }
       
    }
  return (
    <>
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="Email">Email</label>
                    <input type="email" placeholder="Email" id="email" name="" onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" id="password" name="" onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
                <p className="register-link">Don't have an account ? <Link to={'/register'}>Register here</Link></p>
            </form>
        </div>
    </>
  )
}
