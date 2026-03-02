import { useState } from 'react'
import api from '../services/api'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

const handleLogin = () => {
    api.post('/api/auth/login', { email, password })
      .then(response => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('role', response.data.role)
        localStorage.setItem('name', response.data.name)

        if (response.data.role === 'ADMIN') {
          window.location.href = '/admin'
        } else {
          window.location.href = '/dashboard'
        }
      })
      .catch(error => {
        alert('Email ou password incorrect')
      })
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-96">
        <h1 className="text-3xl font-bold text-slate-700 mb-2 text-center">TaskFlow</h1>
        <p className="text-slate-400 text-center text-sm mb-8">Sign in to your account</p>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
          <button
            onClick={handleLogin}
            className="bg-slate-700 text-white py-3 rounded-lg hover:bg-slate-800 font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage