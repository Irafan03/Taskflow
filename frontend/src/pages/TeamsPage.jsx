import { useState, useEffect } from 'react'
import api from '../services/api'

function TeamsPage() {
  const [teams, setTeams] = useState([])
  const [name, setName] = useState('')

  useEffect(() => {
    api.get('/api/teams')
      .then(response => {
        setTeams(response.data)
      })
  }, [])

  const handleCreate = () => {
    api.post('/api/teams', { name })
      .then(response => {
        setTeams([...teams, response.data])
        setName('')
      })
  }

  const handleDelete = (id) => {
    api.delete(`/api/teams/${id}`)
      .then(() => {
        setTeams(teams.filter(team => team.id !== id))
      })
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold text-slate-700 mb-6">Teams</h1>

      <div className="bg-white rounded-xl shadow p-6 mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Team Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-slate-300 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
        <button
          onClick={handleCreate}
          className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800"
        >
          Add Team
        </button>
      </div>

      <div className="grid gap-4">
        {teams.map(team => (
          <div key={team.id} className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
            <p className="font-semibold text-slate-800">{team.name}</p>
            <button
              onClick={() => handleDelete(team.id)}
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

export default TeamsPage