import {Route, Routes} from 'react-router'
import Home from './pages/Home'
import Layout from './Layout'
import Intro from './pages/getting-started/Intro'
import Installation from './pages/getting-started/Installation'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="docs">
          <Route path="reason" element={<Intro />} />
          <Route path="installation" element={<Installation />} />
        </Route>
        <Route path="*" element={<div className="p-4">Page Not Found</div>} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
