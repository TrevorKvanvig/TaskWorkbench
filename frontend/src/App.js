import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/dashboard';



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route
          path="/"
          element={
            <Dashboard />
          }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
