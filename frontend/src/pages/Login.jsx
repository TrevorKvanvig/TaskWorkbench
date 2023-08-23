import { useState } from "react";
import { useLogin } from "../hooks/useLogin"
import { useNavigate } from 'react-router-dom';

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
    <div className="signup-page ">
      <form className="signup-form form" onSubmit={handleSubmit}>
      <h3>Log in</h3>

      <label>Email:</label>
      <input type="email" name='email'value={formDetails.email} onChange={handleChange}></input>

      <label>password:</label>
      <input type="text" name='password' value={formDetails.password} onChange={handleChange}></input>

      <div>
        <button disabled={isLoading} type="submit">Login</button>
      </div>
      {error && <div className="error">{error}</div>}
      
    </form>
    </div>
    
    
  );
}

export default Login