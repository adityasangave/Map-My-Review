import React, { useRef } from 'react'
import './Styles/login.css'
import axios from 'axios'
import CancelIcon from '@mui/icons-material/Cancel';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


export default function Login(props) {
    const uname = useRef()
    const pass = useRef()

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const user = {
            username: uname.current.value,
            password: pass.current.value
        }
        console.log(user)
        try {
            const res = await axios.post("/user/login", user)
            props.setCurrentUser(res.data.username)
            props.setShowLogin(false)
            toast.success('Login Successfull', {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='login-container'>
            <div className="lg-container">
                <div className="heading">
                    <h3>Login</h3>
                </div>
                <form className="login-app" onSubmit={handleLoginSubmit}>
                    <input type="text" className="username" placeholder='Username' ref={uname} />
                    <input type="password" className="password" placeholder='Password' ref={pass} />

                    <button className="submit" type='submit'>
                        Submit
                    </button>
                    <CancelIcon onClick={() => props.setShowLogin(false)} />
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}
