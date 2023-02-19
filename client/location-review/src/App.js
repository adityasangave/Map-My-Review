import { useState } from 'react';
import './App.css';
import Maps from './Components/Maps';
import Login from './Components/Login';
import Register from './Components/Register'

function App() {
  const [currentUser, setCurrentUser] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  return (
    <div>
      <Maps currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <div className="footer">
        {
          currentUser ? (<button>Log Out</button>) :
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
