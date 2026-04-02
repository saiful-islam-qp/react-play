import {Route, Routes} from 'react-router'
import Home from './pages/Home'
import Layout from './Layout'
import Intro from './pages/getting-started/Intro'
import Installation from './pages/getting-started/Installation'
import WhatAreLevels from './pages/how-to/WhatAreLevels'
import InitialLevel from './pages/how-to/InitialLevel'
import BaseTitle from './pages/how-to/BaseTitle'
import HeaderCustomization from './pages/how-to/HeaderCustomization'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="docs">
          <Route path="reason" element={<Intro />} />
          <Route path="installation" element={<Installation />} />
          <Route path="what-are-levels" element={<WhatAreLevels />} />
          <Route path="initial-level" element={<InitialLevel />} />
          <Route path="base-title" element={<BaseTitle />} />
          <Route
            path="header-customization"
            element={<HeaderCustomization />}
          />
        </Route>
        <Route path="*" element={<div className="p-4">Page Not Found</div>} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
