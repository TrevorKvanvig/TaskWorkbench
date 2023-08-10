import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
const Signup = () => {
  const [formDetails, setDetails] = useState({
    username: '',
    email: '',
    password: ''
  });

  const { signup, isLoading, error} = useSignup();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    await signup(formDetails.username, formDetails.email, formDetails.password);
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
      <form className="signup-form form" onSubmit={handleSubmit}>
      <h3>SIGN UP</h3>

      <label>Email:</label>
      <input type="email" name='email'value={formDetails.email} onChange={handleChange}></input>

      <label>Username:</label>
      <input type="text" name='username' value={formDetails.username} onChange={handleChange}></input>

      <label>password:</label>
      <input type="text" name='password' value={formDetails.password} onChange={handleChange}></input>

      <div>
        <button disabled={isLoading} type="submit">SIGNUP</button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
    </div>
    
    
  );
}

export default Signup