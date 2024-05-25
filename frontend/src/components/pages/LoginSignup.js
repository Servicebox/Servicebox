import React,{useState} from 'react'
import './LoginSignup.css'
//import { response } from 'express';


const LoginSignup = () => {

  const [state,setState] = useState("Авторизация");
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:""
  });

const changeHandler = (e) =>{
  setFormData({...formData,[e.target.name]:e.target.value})
  console.log(formData)
}

  const login = async () => {
console.log("Login function Executed", formData)
let responseData;
await fetch('https://servicebox35.pp.ru/login',{
  method:'POST',
  headers:{
    Accept:'application/form-data',
    'Content-Type':'application/json',
  },
  body:JSON.stringify(formData),
}).then((response)=> response.json()).then((data)=>responseData = data)
if(responseData.success){
  localStorage.setItem('auth-token',responseData.token);
  window.location.replace("./shop");
}
else{
  alert(responseData.errors);
}
  }



  const signup = async () => {
    console.log("Login function Executed", formData)
    let responseData;
    await fetch('https://servicebox35.pp.ru/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData = data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("./shop");
    }
    else{
      alert(responseData.errors);
    }
  }


  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>{state}</h1>
        <div className='loginsignup-fields'>
          {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type='text' placeholder='Имя' />:<></>}
         
                    <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder="Email " />
                    <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder="пароль" />

        </div>
        <button onClick={()=>{state==="Login"?login():signup()}} >Войти</button>
        {state==="Sign Up"
        ?<p className='loginsignup-login'> Уже есть аккаунт? <span onClick={()=>{setState("Login")}} >Войти</span></p> 
        :<p className='loginsignup-login'> У вас нет аккаунта? <span onClick={()=>{setState("Sign Up")}} >Зарегистрироватся</span></p>}
      
        <div className='loginsignup-agree'>
              <input type='checkbox' name='' id='' />
              <p>продолжая, я соглашаюсь с условиями использования и политикой конфиденциальности.</p>
        </div>
      </div>
      
    </div>
  )
}

export default LoginSignup
