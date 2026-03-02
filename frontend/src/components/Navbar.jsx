import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const name = localStorage.getItem('name')
  const role = localStorage.getItem('role')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('name')
    navigate('/')
  }

  return (
    <nav className="bg-slate-800 p-4 flex justify-between items-center">
      <span className="text-white font-bold text-lg">TaskFlow</span>
      <div className="flex items-center gap-6">
        <span className="text-slate-400 text-sm">👤 {name}</span>

        {role === 'ADMIN' && (
          <Link to="/admin" className="text-slate-300 font-semibold hover:text-white">Dashboard</Link>
        )}

        {role === 'USER' && (
          <>
            <Link to="/dashboard" className="text-slate-300 font-semibold hover:text-white">Dashboard</Link>
            <Link to="/tasks" className="text-slate-300 font-semibold hover:text-white">Tasks</Link>
          </>
        )}

        <button
          onClick={handleLogout}
          className="text-red-400 font-semibold hover:text-red-300"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar