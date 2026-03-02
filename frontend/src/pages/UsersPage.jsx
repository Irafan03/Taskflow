import { useState, useEffect } from 'react'
import api from '../services/api'

function UsersPage() {
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    api.get('/api/users')
      .then(response => {
        setUsers(response.data)
      })
  }, [])

  const handleCreate = () => {
    api.post('/api/users', { name: username, email, password: '123456' })

      .then(response => {
        setUsers([...users, response.data])
        setUsername('')
        setEmail('')
      })
  }

  const handleDelete = (id) => {
    api.delete(`/api/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id))
      })
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold text-slate-700 mb-6">Users</h1>

      <div className="bg-white rounded-xl shadow p-6 mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-slate-300 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-slate-300 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
        <button
          onClick={handleCreate}
          className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800"
        >
          Add User
        </button>
      </div>

      <div className="grid gap-4">
        {users.map(user => (
          <div key={user.id} className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold text-slate-800">{user.username}</p>
              <p className="text-slate-500 text-sm">{user.email}</p>
            </div>
            <button
              onClick={() => handleDelete(user.id)}
              className="bg-slate-600 text-white px-3 py-1 rounded-lg hover:bg-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UsersPage