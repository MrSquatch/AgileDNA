import { Route, Routes } from "react-router-dom"
import { Layout } from "./layaouts/Layout"
import { Devs } from "./pages/Devs"
import { Sprints } from "./pages/Sprints"
import { Tasks } from "./pages/Tasks"
import { Config } from "./pages/Config"

function App() {
  return (
    <Routes>
      <Route  path="/" element={<Layout />} >
        <Route index element={<Tasks />} />
        <Route path="/devs" element={<Devs />} />
        <Route path="/sprints" element={<Sprints />} />
        <Route path="/config" element={<Config />} />
      </Route>
    </Routes>
  )
}

export default App
