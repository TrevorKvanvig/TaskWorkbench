import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const {logout} = useLogout()
  const {user} = useAuthContext();


  const handleClick = () => {
    logout()
  }

  return(
    <header>
      <nav className="navbar">
        <Link to='/'>
          <h1>Task Workbench</h1>
        </Link>
    
      
          {user && (
            <div className='navbar-right'>
              <h3>{user.username}</h3>
              <Link to='/' className='nav-logout-button' onClick={handleClick}>Logout</Link>
            </div>
          )}
          {!user && (
            <div className='navbar-right'>
              <Link to={'/'}><h3>Login</h3></Link>
              <Link to={'/signup'}><h3>Signup</h3></Link>
            </div>
          )}
        
      </nav>
    </header>
    
  );
}

export default Navbar