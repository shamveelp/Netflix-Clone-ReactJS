import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login, signUp } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {

  const [signState, setSignState] = useState("Sign In")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (signState === "Sign In") {
      await login(email, password);
    } else {
      await signUp(name, email, password);
    }
    setLoading(false);
  }

  return (
    loading ? <div className="login-spinner"><img src={netflix_spinner} alt="" /></div> :
    <div className='login'>
      <a href="/"><img src={logo} className='login-logo' alt="" /></a>
      <div className="login-form">
        <h1>{signState}</h1>
        <form action="">
          {signState === "Sign Up" ? <input value={name} onChange={(e) => {setName(e.target.value)}} type="text" placeholder='Enter your name'/> : <></>}
          
          <input value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder='Enter your email'/>
          <input value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder='Enter your password'/>
          {signState === "Sign Up" ? <button type='submit' onClick={user_auth}>Sign Up</button> : <button type='submit' onClick={user_auth}>Sign In</button>}
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
