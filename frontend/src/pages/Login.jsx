import { useState } from "react";
import { useLogin } from "../hooks/useLogin"
import { useNavigate, Link } from 'react-router-dom';


const Login = () => {
  const {login, isLoading, error} = useLogin();
  const navigate = useNavigate();

  const [formDetails, setDetails] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(formDetails.email, formDetails.password);

    // Check if login was successful, then redirect
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      navigate("/dashboard"); // Use the navigate function to redirect
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target
    
    setDetails({
      ...formDetails,
      [name]: value
    })
  }

  return(
    
    <div className="signup-page">
      <div className="login-title-wrapper">
        <h2 className="login-title">Welcome To Task Workbench!</h2>
      </div>

      <form className="signup-form form" onSubmit={handleSubmit}>
      <h3 className="login-title">Log in</h3>

      <input placeholder="Email Address" className="login-input" type="email" name='email'value={formDetails.email} onChange={handleChange}></input>
      
      <input placeholder="Password" className="login-input" type="text" name='password' value={formDetails.password} onChange={handleChange}></input>
      
      <button className="login-input login-button" disabled={isLoading} type="submit">Login</button>
      
      {error && <div className="error">{error}</div>}
      <div className="signup-link-wrapper">
        <h4>Dont Have An Account? <Link className="signup-link" to={'/signup'}>Sign Up Here!</Link></h4>
      </div>
      <div className="signup-link-wrapper2">
        <h4>Just Want to Test? <Link className="signup-link" to={''}>Use Guest Account!</Link></h4>
      </div>
      </form>
    </div>
  );
}

export default Login