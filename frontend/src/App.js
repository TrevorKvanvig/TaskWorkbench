import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const {user} = useAuthContext();
  return (
    <BrowserRouter>
      <Navbar />
      
        <Routes>
          <Route
          path="/dashboard"
          element={
            user ? <Dashboard /> : <Navigate to='/'/>
          }
          />
          <Route
            path='/signup'
            element = {
              <Signup />
            }
          />
          <Route
            path='/'
            element = {
              <Login />
            }
          />
        </Routes>
      
    </BrowserRouter>
  );
}

export default App;
