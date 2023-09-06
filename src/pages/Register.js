import React from 'react'
import Add from '../img/add.png'

const Register = () => {
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>uMessage</span>
            <span className='title'>Register</span>
            <form>
                <input type="text" placeholder='Display Name'/>
                <input type="email" placeholder='Email'/>
                <input type="password" placeholder='Password'/>
                <input style={{display:"none"}}type="file" id="file"/>
                <label htmlFor='file'>
                  <img src={Add} />
                  <span>Add Profile Picture</span>
                </label>
                <button>Sign Up</button>
            </form>
            <p>Already registered? Login</p>
        </div>
    </div>
  )
}

export default Register