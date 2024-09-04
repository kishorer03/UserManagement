import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { register } from "../Service/UserService";

export default function RegisterPage(){

    const navigate=useNavigate();
    const [email,setEmail]=useState('');
    const [name,setName]=useState('');
    const [city,setCity]=useState('');
    const [pass,setPass]=useState('');
    const [role,setRole]=useState('');
    const [err,setErr]=useState("");

    async function handleRegister(e){
        e.preventDefault();
        try{
            const data=await register(name,city,role,email,pass,localStorage.getItem("token"))
        if(data.statusCode===200){
            navigate("/about-user")
        }else if(data.statusCode===500){
            setCity('')
            setEmail('')
            setName('')
            setPass('')
            setRole('')
            throw new Error("Email already registered")
        }
    }catch(err){
        setErr(err.message);
        setTimeout(()=>{
            setErr('')
        },5000)
    }
    }
    return <div className="min-h-screen flex flex-col items-center justify-center bg-gray-500">
        {err?<p className="text-red-900">{err}</p>:null}
        <form onSubmit={handleRegister} className="flex flex-col justify-center items-center gap-[30px]">
                <div className="flex  flex-col gap-[30px] justify-center items-center mt-[40px] bg-gray-800 text-white font-bold
                    rounded-xl p-[40px]">
                <div className="flex">
                    <div className="w-[100px]"><label htmlFor="name-id">NAME:</label></div>
                    <input required className="px-[10px] py-[2px] rounded-sm border-black border-[1px] text-black" type="text" id="name-id" value={name} onChange={(e)=>setName(e.target.value)}></input>
                </div>

                <div className="flex">
                    <div className="w-[100px]"><label htmlFor="email-id">EMAIL:</label></div>
                    <input required className="text-black py-[2px] px-[10px] rounded-sm border-black border-[1px]" type="text" id="email-id" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                </div>
                <div className="flex">
                    <div className="w-[100px]"><label htmlFor="pass-id">PASSWORD:</label></div>
                    <input required className="text-black py-[2px] px-[10px] rounded-sm border-black border-[1px]" type="password" id="pass-id" value={pass} onChange={(e)=>setPass(e.target.value)}></input>
                </div>
                
                <div className="flex">
                    <div className="w-[100px]"><label htmlFor="city-id">CITY:</label></div>
                    <input required className="text-black py-[2px] px-[10px] rounded-sm border-black border-[1px]" type="text" id="city-id" value={city} onChange={(e)=>setCity(e.target.value)}></input>
                </div>
                <div className="flex mb-[20px]">
                    <div className="w-[100px]"><label htmlFor="role-id">ROLE:</label></div>
                    {/* <input required className="text-black py-[2px] px-[10px] rounded-sm border-black border-[1px]" type="text" id="role-id" value={role} onChange={(e)=>setRole(e.target.value)}></input> */}
                    {/* <div className="pl-[30px]"> */}
                    <select className="text-black text-center w-[230px] " value={role} onChange={(e)=>setRole(e.target.value)}>
                        <option value="">--</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="USER">USER</option>

                    </select>
                    {/* </div> */}
                </div>
                </div>
                <input className="rounded-lg bg-black text-white w-[100px]" type="submit" value="SUBMIT"></input>
                
            </form>
    </div>
}