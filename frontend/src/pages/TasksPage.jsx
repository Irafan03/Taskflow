import { useState, useEffect } from 'react'
import api from '../services/api'

function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])
  const [projects, setProjects] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [projectId, setProjectId] = useState('')

  useEffect(() => {
    api.get('/api/tasks').then(r => setTasks(r.data))
    api.get('/api/users').then(r => setUsers(r.data))
    api.get('/api/projects').then(r => setProjects(r.data))
  }, [])

  const handleCreate = () => {
    api.post('/api/tasks', {
      title,
      description,
      assignedTo: { id: assignedTo },
      project: { id: projectId },
      status: 'TODO'
    }).then(response => {
      setTasks([...tasks, response.data])
      setTitle('')
      setDescription('')
      setAssignedTo('')
      setProjectId('')
    })
  }

  const handleDelete = (id) => {
    api.delete(`/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter(t => t.id !== id)))
  }

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
      <h1 className="text-3xl font-bold text-slate-700 mb-6">Tasks</h1>

      {/* Form */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 grid grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
        >
          <option value="">Assign to User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
        >
          <option value="">Select Project</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
        <button
          onClick={handleCreate}
          className="col-span-2 bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-800"
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <div className="grid gap-4">
        {tasks.map(task => (
          <div key={task.id} className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold text-slate-800">{task.title}</p>
              <p className="text-slate-500 text-sm">{task.description}</p>
              <p className="text-slate-400 text-xs mt-1">
                👤 {task.assignedTo?.name} · 📁 {task.project?.name}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={task.status}
                onChange={(e) => handleStatus(task.id, e.target.value)}
                className={`text-sm px-3 py-1 rounded-lg font-semibold ${statusColor(task.status)}`}
              >
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="DONE">DONE</option>
              </select>
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-slate-600 text-white px-3 py-1 rounded-lg hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TasksPage