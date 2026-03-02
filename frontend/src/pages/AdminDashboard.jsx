import { useState, useEffect } from 'react'
import api from '../services/api'

function AdminDashboard() {
    const [teamMembers, setTeamMembers] = useState([])

  const [users, setUsers] = useState([])
  const [teams, setTeams] = useState([])
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])
  const [activeTab, setActiveTab] = useState('users')

  // Users
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Teams
  const [teamName, setTeamName] = useState('')

  // Projects
  const [projectName, setProjectName] = useState('')
  const [projectDesc, setProjectDesc] = useState('')
  const [teamId, setTeamId] = useState('')

  // Tasks
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDesc, setTaskDesc] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [projectId, setProjectId] = useState('')
  const [taskTeamId, setTaskTeamId] = useState('')
  const [teamUsers, setTeamUsers] = useState([])

  useEffect(() => {
    api.get('/api/users').then(r => setUsers(r.data))
    api.get('/api/teams').then(r => setTeams(r.data))
    api.get('/api/projects').then(r => setProjects(r.data))
    api.get('/api/tasks').then(r => setTasks(r.data))
  }, [])

  const handleTaskTeamChange = (id) => {
    setTaskTeamId(id)
    setAssignedTo('')
    if (id) {
      api.get(`/api/teams/${id}/users`).then(r => setTeamUsers(r.data))
    } else {
      setTeamUsers([])
    }
  }

  // Users CRUD
  const createUser = () => {
    api.post('/api/users', { name, email, password, role: 'USER' })
      .then(r => { setUsers([...users, r.data]); setName(''); setEmail(''); setPassword('') })
  }
  const deleteUser = (id) => {
    api.delete(`/api/users/${id}`).then(() => setUsers(users.filter(u => u.id !== id)))
  }

  // Teams CRUD
 const createTeam = () => {
  const members = teamMembers.map(id => ({ id }))
  api.post('/api/teams', { name: teamName, members })
    .then(r => { setTeams([...teams, r.data]); setTeamName(''); setTeamMembers([]) })
}
  const deleteTeam = (id) => {
    api.delete(`/api/teams/${id}`).then(() => setTeams(teams.filter(t => t.id !== id)))
  }

  // Projects CRUD
  const createProject = () => {
    api.post('/api/projects', { name: projectName, description: projectDesc, team: { id: teamId } })
      .then(r => { setProjects([...projects, r.data]); setProjectName(''); setProjectDesc(''); setTeamId('') })
  }
  const deleteProject = (id) => {
    api.delete(`/api/projects/${id}`).then(() => setProjects(projects.filter(p => p.id !== id)))
  }

  // Tasks CRUD
  const createTask = () => {
    api.post('/api/tasks', {
      title: taskTitle,
      description: taskDesc,
      assignedTo: { id: assignedTo },
      project: { id: projectId },
      status: 'TODO'
    }).then(r => {
      setTasks([...tasks, r.data])
      setTaskTitle(''); setTaskDesc(''); setAssignedTo(''); setProjectId(''); setTaskTeamId(''); setTeamUsers([])
    })
  }
  const deleteTask = (id) => {
    api.delete(`/api/tasks/${id}`).then(() => setTasks(tasks.filter(t => t.id !== id)))
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold text-slate-700 mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {['users', 'teams', 'projects', 'tasks'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-semibold capitalize ${
              activeTab === tab ? 'bg-slate-700 text-white' : 'bg-white text-slate-600'
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* USERS TAB */}
      {activeTab === 'users' && (
        <div>
          <div className="bg-white rounded-xl shadow p-6 mb-6 grid grid-cols-3 gap-3">
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)}
              className="border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-slate-400" />
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
              className="border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-slate-400" />
            <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}
              className="border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-slate-400" />
            <button onClick={createUser}
              className="col-span-3 bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-800">
              Add User
            </button>
          </div>
          <div className="grid gap-4">
            {users.map(user => (
              <div key={user.id} className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-slate-800">{user.name}</p>
                  <p className="text-slate-500 text-sm">{user.email}</p>
                  <p className="text-slate-400 text-xs">{user.role}</p>
                </div>
                <button onClick={() => deleteUser(user.id)}
                  className="bg-slate-600 text-white px-3 py-1 rounded-lg hover:bg-red-500">Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TEAMS TAB */}
      {activeTab === 'teams' && (
  <div>
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex gap-3 mb-4">
        <input placeholder="Team Name" value={teamName} onChange={e => setTeamName(e.target.value)}
          className="border border-slate-300 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-slate-400" />
      </div>
      <p className="text-slate-600 font-semibold mb-2">Select Members :</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {users.map(user => (
          <button key={user.id}
            onClick={() => {
              const members = teamMembers.includes(user.id)
                ? teamMembers.filter(id => id !== user.id)
                : [...teamMembers, user.id]
              setTeamMembers(members)
            }}
            className={`px-3 py-1 rounded-lg text-sm font-semibold ${
              teamMembers.includes(user.id)
                ? 'bg-slate-700 text-white'
                : 'bg-slate-200 text-slate-700'
            }`}>
            {user.name}
          </button>
        ))}
      </div>
      <button onClick={createTeam}
        className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800">
        Add Team
      </button>
    </div>
    <div className="grid gap-4">
      {teams.map(team => (
        <div key={team.id} className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
          <div>
            <p className="font-semibold text-slate-800">{team.name}</p>
            <p className="text-slate-400 text-xs">👥 {team.members?.map(m => m.name).join(', ')}</p>
          </div>
          <button onClick={() => deleteTeam(team.id)}
            className="bg-slate-600 text-white px-3 py-1 rounded-lg hover:bg-red-500">Delete</button>
        </div>
      ))}
    </div>
  </div>
)}

      {/* PROJECTS TAB */}
      {activeTab === 'projects' && (
        <div>
          <div className="bg-white rounded-xl shadow p-6 mb-6 grid grid-cols-2 gap-3">
            <input placeholder="Project Name" value={projectName} onChange={e => setProjectName(e.target.value)}
              className="border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-slate-400" />
            <input placeholder="Description" value={projectDesc} onChange={e => setProjectDesc(e.target.value)}
              className="border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-slate-400" />
            <select value={teamId} onChange={e => setTeamId(e.target.value)}
              className="border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-slate-400">
              <option value="">Select Team</option>
              {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            <button onClick={createProject}
              className="bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-800">
              Add Project
            </button>
          </div>
          <div className="grid gap-4">
            {projects.map(project => (
              <div key={project.id} className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-slate-800">{project.name}</p>
                  <p className="text-slate-500 text-sm">{project.description}</p>
                  <p className="text-slate-400 text-xs">Team: {project.team?.name}</p>
                </div>
                <button onClick={() => deleteProject(project.id)}
                  className="bg-slate-600 text-white px-3 py-1 rounded-lg hover:bg-red-500">Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TASKS TAB */}
      {activeTab === 'tasks' && (
        <div>
          <div className="bg-white rounded-xl shadow p-6 mb-6 grid grid-cols-2 gap-3">
            <input placeholder="Task Title" value={taskTitle} onChange={e => setTaskTitle(e.target.value)}
              className="border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-slate-400" />
            <input placeholder="Description" value={taskDesc} onChange={e => setTaskDesc(e.target.value)}
              className="border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-slate-400" />
            <select value={projectId} onChange={e => setProjectId(e.target.value)}
              className="border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-slate-400">
              <option value="">Select Project</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <select value={taskTeamId} onChange={e => handleTaskTeamChange(e.target.value)}
              className="border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-slate-400">
              <option value="">Select Team</option>
              {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            <select value={assignedTo} onChange={e => setAssignedTo(e.target.value)}
              disabled={!taskTeamId}
              className="border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:opacity-50 col-span-2">
              <option value="">Assign to User</option>
              {teamUsers.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
            <button onClick={createTask}
              className="col-span-2 bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-800">
              Add Task
            </button>
          </div>
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
                  <span className={`text-xs px-3 py-1 rounded-lg font-semibold ${
                    task.status === 'TODO' ? 'bg-slate-200 text-slate-700' :
                    task.status === 'IN_PROGRESS' ? 'bg-yellow-200 text-yellow-700' :
                    'bg-green-200 text-green-700'
                  }`}>
                    {task.status}
                  </span>
                  <button onClick={() => deleteTask(task.id)}
                    className="bg-slate-600 text-white px-3 py-1 rounded-lg hover:bg-red-500">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard