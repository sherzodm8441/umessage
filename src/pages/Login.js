import React, { useState } from 'react'
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [error, SetError] = useState(false)

  const navigate = useNavigate();

  async function handleSubmit(event){
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    try {

      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");

    } catch (error) {

      console.log(error);
      SetError(true);

    }
      
  }
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>uMessage</span>
            <span className='title'>Login</span>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='Email'/>
                <input type="password" placeholder='Password'/>
        
                <button>Sign In</button>
                {error && <span>Error. Try again!</span>}
            </form>
            <p>Not registered? <Link to="/register">Register</Link></p>
        </div>
    </div>
  )
}

export default Login