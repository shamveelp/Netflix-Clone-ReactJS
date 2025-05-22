import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'

const Login = () => {

  const [signState, setSignState] = useState("Sign In")


  return (
    <div className='login'>
      <a href="/"><img src={logo} className='login-logo' alt="" /></a>
      <div className="login-form">
        <h1>{signState}</h1>
        <form action="">
          {signState === "Sign Up" ? <input type="text" placeholder='Enter your name'/> : <></>}
          
          <input type="email" placeholder='Enter your email'/>
          <input type="password" placeholder='Enter your password'/>
          {signState === "Sign Up" ? <button>Sign Up</button> : <button>Sign In</button>}
          <div className="form-help">
            {signState === "Sign Up" ? 
                 <></> :
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember me</label>
            </div>

          }
            <p>Need help?</p>
          </div>
        </form>

        <div className="form-switch">

          {signState === "Sign Up" ? <p>Already have account..? 
            <span onClick={() => {setSignState("Sign In")}}>Sign In Now</span></p> : 
            <p>New to Neflix..? <span onClick={() => {setSignState("Sign Up")}}>Sign Up Now</span></p>
            }

        </div>

      </div>
    </div>
  )
}

export default Login
