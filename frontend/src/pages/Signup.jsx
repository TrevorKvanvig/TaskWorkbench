import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useNavigate, Link } from 'react-router-dom';
const Signup = () => {
  const navigate = useNavigate();
  const [formDetails, setDetails] = useState({
    username: '',
    email: '',
    password: ''
  });

  const { signup, isLoading, error} = useSignup();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formDetails.username, formDetails.email, formDetails.password);
    await signup(formDetails.username, formDetails.email, formDetails.password);

    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      navigate("/dashboard"); // Use the navigate function to redirect
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    
    setDetails({
      ...formDetails,
      [name]: value
    })
  }

  return(
    <div className="signup-page ">
    <div className="login-title-wrapper">
        <h2 className="login-title">Create An Account</h2>
      </div>
      <form className="signup-form form" onSubmit={handleSubmit}>
      <h3 className="login-title">SIGN UP</h3>

      <input placeholder="Email Adress" className="login-input" type="text" name='email'value={formDetails.email} onChange={handleChange}></input>

      <input placeholder="User Name" className="login-input" type="text" name='username' value={formDetails.username} onChange={handleChange}></input>

      <input placeholder="Password" className="login-input" type="password" name='password' value={formDetails.password} onChange={handleChange}></input>
    
      <button className="login-input login-button" disabled={isLoading} type="submit">SIGNUP</button>
      
      {error && <div className="error">{error}</div>}
      <div className="signup-link-wrapper">
        <h4>Already Have an Account? <Link className="signup-link" to={'/'}>Login!</Link></h4>
      </div>
    </form>
    </div>
    
    
  );
}

export default Signup