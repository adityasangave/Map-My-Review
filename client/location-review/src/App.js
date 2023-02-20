import { useState } from 'react';
import './App.css';
import Maps from './Components/Maps';
import Login from './Components/Login';
import Register from './Components/Register'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [currentUser, setCurrentUser] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  const handleLogout = () => {
    toast.success('Logout Successfull', {
      position: toast.POSITION.TOP_RIGHT,
      theme: "dark",
    });
    setCurrentUser(null)
  }

  return (
    <div>
      <Maps currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <div className="footer">
        {
          currentUser ? (<button className='logout' onClick={handleLogout}>Log Out</button>) :
            (
              <div className="container">
                <button className="login" onClick={() => setShowLogin(true
                )}>
                  Login
                </button>
                <button className="register" onClick={() => setShowRegister(true)}>
                  Register
                </button>
              </div>
            )
        }
        <ToastContainer />
      </div>

      {
        showLogin && <Login setCurrentUser={setCurrentUser} setShowLogin={setShowLogin} />
      }
      {
        showRegister && <Register setShowRegister={setShowRegister} />
      }
    </div >

  )
}

export default App;
