import {Outlet} from 'react-router'
import {SideBar} from './components/sidebar/Sidebar'

const Layout = () => {
  return (
    <div>
      <div className="sticky top-0 z-20 flex items-center px-4 h-[48px] bg-(--main-bg-color)/80 backdrop-blur-md rounded-b-lg">
        <h1 className="font-semibold">Drill Down</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 px-4">
        <div className="col-span-6">
          <Outlet />
        </div>
        <div className="hidden lg:block lg:col-span-2">
          <SideBar />
        </div>
      </div>
    </div>
  )
}

export default Layout
