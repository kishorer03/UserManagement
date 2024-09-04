import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../Service/UserService";

export default function Login(){

    const [email,setEmail]=useState("")
    const [pass,setPass]=useState("")
    const [err,setErr]=useState("")
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)

    const[showRead,setShowRead]=useState(false);
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('email')
    localStorage.removeItem('empid')

    async function handleLogin(e){
        e.preventDefault()
        setLoading(true);
        try{
            const data=await login(email,pass);
            setEmail('')
            setPass('')
            if(data.message==='Failed to fetch'){
                throw new Error("Server is Down");
            }
            if(data.statusCode===500){
            throw new Error("Invalid Credentials");
            }
            if(data.token){
            setLoading(false)
            localStorage.setItem('token',data.token)
            localStorage.setItem('role',data.role)
            localStorage.setItem('email',email);
            navigate(`/about-user`)
            }
            
        }catch(e){
            setLoading(false)
            setErr(e);
            setTimeout(()=>{
                setErr('')
            },3000)
        }
        
    }

    return(
        <div className="flex h-screen justify-center items-center relative">
            {showRead?
            <div className="flex flex-col gap-[10px] info-banner bg-black text-white p-4 text-center absolute top-0 w-full">
            <div className="flex gap-[20px] justify-center items-center">
            <div className="font-bold underline underline-offset-2">
                Default Credentials:
            </div>
            <div>
               <p>ADMIN {"-->"} Email - <strong>admin123@gmail.com</strong>, Password - <strong>admin@123</strong></p>
               <p>USER {"-->"} Email - <strong>user123@gmail.com</strong>, Password - <strong>user@123</strong></p>
            </div>
            </div>
            <div>
                <strong>NOTE: </strong> Admin will have privileged access. User will have constrained access
            </div>
        
            </div>
            :null}
            
            <div className="bg-slate-400 px-[100px] pt-[60px] pb-[40px] rounded-lg">
            <h2 className="w-full text-center">LOGIN PAGE</h2>
            {err?
            <p className="mt-[5px] text-red-700 text-center">{err.message}!!</p>
            :loading?<p className="mt-[5px] text-red-700 text-center">LOADING!!</p>:<></>
            }
            <form onSubmit={handleLogin} className="flex flex-col gap-[30px] justify-center items-center mt-[30px]">
                <div className="flex flex-col">
                    <label htmlFor="email-id">EMAIL:</label>
                    <input required className="px-[10px] py-[3px] rounded-sm" type="text" id="email-id" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="pass-id">PASSWORD:</label>
                    <input required className="px-[10px] py-[3px] rounded-sm" type="password" id="pass-id" value={pass} onChange={(e)=>setPass(e.target.value)}></input>
                </div>
                <input className="rounded-lg bg-black text-center text-white w-[100px]" type="submit" value="LOGIN" disabled={email===""||pass===""}></input>
            </form>
            <button className="w-full text-center mt-[30px] underline underline-offset-2 text-blue-800 font-bold" onClick={()=>{setShowRead(!showRead)}}>ReadMe</button>
            </div>
        </div>
    )
}