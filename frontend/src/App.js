import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route
          path="/dashboard"
          element={
            <Dashboard />
          }
          />
          <Route
            path='/signup'
            element = {
              <Signup />
            }
          />
          <Route
            path='/login'
            element = {
              <Login />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
