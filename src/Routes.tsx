import {Route, Routes} from 'react-router'
import Home from './pages/Home'
import Layout from './Layout'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
