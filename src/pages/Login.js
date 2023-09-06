import React from 'react'

const Login = () => {
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>uMessage</span>
            <span className='title'>Login</span>
            <form>
                <input type="email" placeholder='Email'/>
                <input type="password" placeholder='Password'/>
        
                <button>Sign In</button>
            </form>
            <p>Not registered? Register</p>
        </div>
    </div>
  )
}

export default Login