import { Link } from 'react-router-dom';

const Navbar = () => {
  return(
    <header>
      <div className="navbar">
        <Link to='/'>
          <h1>Task Workbench</h1>
        </Link>
        <div className='navbar-right'>
          <h3><a>LOGOUT</a></h3>
        </div>
      </div>
    </header>
    
  );
}

export default Navbar