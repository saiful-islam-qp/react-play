import {Outlet} from 'react-router'
import {LeftSidebar} from './components/sidebar/LeftSidebar'

const Layout = () => {
  return (
    <div className="flex">
      <div className="hidden lg:block">
        <LeftSidebar />
      </div>
      <div className="flex-1 lg:ml-64">
        <div className="sticky top-0 z-20 flex items-center px-4 h-[48px] bg-white border-b border-slate-200"></div>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
