import { Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './layaouts/Layout';
import { Tasks, Devs, Sprints, Config } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Tasks />} />
          <Route path="devs" element={<Devs />} />
          <Route path="sprints" element={<Sprints />} />
          <Route path="config" element={<Config />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;