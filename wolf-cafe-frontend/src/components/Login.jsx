import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../css/Login.css'
import { loginAPICall, storeToken, saveLoggedInUser } from '../services/AuthService'
import logo from '../assets/wolf-head.png'

function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showHelp, setShowHelp] = useState(false)

  const handleLogin = async () => {
    setError('')
    try {
      const response = await loginAPICall(username, password)
      const token = response.data.accessToken

      storeToken(token)
      saveLoggedInUser(username, response.data.role)

      const role = response.data.role
      if (role === 'ROLE_ADMIN') navigate('/tax')
      else if (role === 'ROLE_STAFF') navigate('/inventory')
      else navigate('/menu')

    } catch (err) {
      setError(err.response?.data?.message || 'Invalid username or password.')
    }
  }

  return (
    <div id='login-background'>
      <div id='login-container'>
        <div id='logo-container'>
          <h1 id='login-logo'>WolfCafe</h1>
          <img src={logo}/>
        </div>
        <div id='login-form'>
          <input
            id='login-username'
            type='text'
            placeholder='Username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            id='login-password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <p style={{ color: '#c0392b', fontSize: '0.85rem' }}>{error}</p>}
          <button id='login-button' onClick={handleLogin}>Login</button>
          <p id='login-register-button' onClick={() => navigate('/register')}>Register</p>
        </div>
      </div>

      {showHelp && (
        <div id='login-help-panel' role='dialog' aria-label='About this demo'>
          <p>
            This is a demo built for a class project. Feel free to look around.
          </p>
          <p>
            Test accounts (username / password "password"):
          </p>
          <ul>
            <li><strong>admin</strong></li>
            <li><strong>staff</strong></li>
            <li><strong>customer</strong></li>
          </ul>
          <p>
            You can also register your own customer account, or create a staff
            account from the admin page.
          </p>
          <p>
            The database resets every day at midnight.
          </p>
        </div>
      )}

      <button
        id='login-help-button'
        aria-label='About this demo'
        aria-expanded={showHelp}
        onClick={() => setShowHelp(prev => !prev)}
      >
        ?
      </button>
    </div>
  )
}

export default Login