import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';


function App() {
  
  return (
    <BrowserRouter>
      <Navbar />
      
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
