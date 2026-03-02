import { useState, useEffect } from 'react'
import api from '../services/api'

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const name = localStorage.getItem('name')

  useEffect(() => {
    api.get('/api/tasks/my')
      .then(r => setTasks(r.data))
  }, [])

  const handleStatus = (id, status) => {
    api.put(`/api/tasks/${id}/status`, { status })
      .then(response => {
        setTasks(tasks.map(t => t.id === id ? response.data : t))
      })
  }

  const statusColor = (status) => {
    if (status === 'TODO') return 'bg-slate-200 text-slate-700'
    if (status === 'IN_PROGRESS') return 'bg-yellow-200 text-yellow-700'
    if (status === 'DONE') return 'bg-green-200 text-green-700'
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold text-slate-700 mb-2">
        Welcome, {name} 👋
      </h1>
      <p className="text-slate-400 mb-8">Here are your tasks</p>

      <div className="grid gap-4">
        {tasks.length === 0 && (
          <p className="text-slate-400 text-center mt-20">No tasks assigned yet.</p>
        )}
        {tasks.map(task => (
          <div key={task.id} className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold text-slate-800">{task.title}</p>
              <p className="text-slate-500 text-sm">{task.description}</p>
              <p className="text-slate-400 text-xs mt-1">📁 {task.project?.name}</p>
            </div>
            <select
              value={task.status}
              onChange={(e) => handleStatus(task.id, e.target.value)}
              className={`text-sm px-3 py-1 rounded-lg font-semibold ${statusColor(task.status)}`}
            >
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
