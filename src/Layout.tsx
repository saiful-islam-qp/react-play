import {useState} from 'react'
import {Outlet} from 'react-router'
import {NavLink} from 'react-router'
import {Menu} from 'lucide-react'
import {LeftSidebar} from './components/sidebar/LeftSidebar'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex">
      {/* Backdrop — mobile only, sits behind sidebar, closes it on tap */}
      <div
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity duration-300 lg:hidden ${
          sidebarOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <LeftSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center px-4 h-[48px] bg-white border-b border-slate-200">
          <button
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-md text-slate-600 hover:bg-slate-100 transition-colors mr-2"
            onClick={() => setSidebarOpen(prev => !prev)}
            aria-label="Toggle sidebar"
          >
            <Menu size={18} />
          </button>
          <NavLink
            to="/"
            className="lg:hidden text-lg font-bold text-slate-700"
          >
            Drilldown
          </NavLink>
        </div>

        <div className="container md:mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
