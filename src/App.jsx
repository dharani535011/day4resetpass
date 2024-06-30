import { useState } from 'react'

import './App.css'
import axios from 'axios'

function App() {
  const [success,setsuccess]=useState(true)
  const [message,setmessage]=useState("")
  const [values, setvalues] = useState({
    otp:"",
    password:"",
    repassword:""
  })
  const handlechange=(e)=>{
   
    const {value,name}=e.target 
    setvalues((pre)=>({
     ...pre,[name]:value
    }))
 
}

  const handlelogin=async(e)=>{
       e.preventDefault()
       const rees=await axios.post(`https://nodesjstask4.onrender.com/user/resetpassword`,{
        otp:values.otp,
        password:values.password,
        repass:values.repassword
       },{withCredentials:true})
        if(rees.data.message==="password changed"){
          setsuccess(false)
          setmessage(rees.data.message)
        }
  }
  return (
    <>
      <div>
        <h1>Reset your password :</h1>
        {success?( <div className='w-100 d-flex justify-content-center align-items-center' id='login'>
    <form>
    <div class="mb-3">
  <label for="name" class="form-label">OTP</label>
  <input type="name" class="form-control" id="name" name='otp' value={values.otp} onChange={(e)=>handlechange(e)}/>
</div>
<div class="mb-3">
  <label for="exampleInputPassword1" class="form-label">Password</label>
  <input type="password" class="form-control" id="exampleInputPassword1"  name='password' value={values.password} onChange={(e)=>handlechange(e)}/>
</div>
<div class="mb-3">
  <label for="exampleInputPassword1" class="form-label">Re-Password</label>
  <input type="password" class="form-control" id="exampleInputPassword12"  name='repassword' value={values.repassword} onChange={(e)=>handlechange(e)}/>
</div>
<button type="submit" class="btn btn-primary" onClick={handlelogin}>Submit</button>
</form>

  </div>):(<div className='w-100 d-flex justify-content-center align-items-center' id='login'><h1>{message}</h1></div>)}
       
      </div>
    </>
  )
}

export default App
