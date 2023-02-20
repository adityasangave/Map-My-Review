import React, { useRef } from 'react'
import './Styles/register.css'
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register(props) {

    const uname = useRef();
    const email = useRef();
    const pass = useRef();

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        const user = {
            username: uname.current.value,
            email: email.current.value,
            password: pass.current.value
        }

        try {
            const res = await axios.post("/user/register", user)
            props.setShowRegister(false)
            toast.success('Registeration Successfull', {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
            });
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="register-container">
            <div className="rg-container">
                <div className="heading">
                    <h3>Register</h3>
                </div>

                <form className='rg-form' onSubmit={handleRegisterSubmit}>
                    <input type="text" className="name" placeholder='Username' ref={uname} />
                    <input type="text" className="email" placeholder='Email' ref={email} />
                    <input type="password" className="password" placeholder='Password' ref={pass} />

                    <button className="submit" type='submit'>Register</button>
                    <CancelIcon onClick={() => props.setShowRegister(false)} />
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}
