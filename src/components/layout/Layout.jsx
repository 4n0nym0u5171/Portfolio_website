import { Outlet } from 'react-router-dom'
import { Topbar } from '../common'
import './Layout.css'

export default function Layout() {
  return (
    <div className="layout">
      <Topbar />
      <main className="main-content" role="main">
        <Outlet />
      </main>
    </div>
  )
}