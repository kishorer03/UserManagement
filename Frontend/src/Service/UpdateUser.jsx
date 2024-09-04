import { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { getById } from "./UserService";
import { updateById } from "./UserService";

export default function UpdateUser(){
    
    const id=useParams().id;
    const navigate=useNavigate();
    const [email,setEmail]=useState('');
    const [name,setName]=useState('');
    const [city,setCity]=useState('');
    const [role,setRole]=useState('');
    const [err,setErr]=useState("");

    // console.log(id)

    useEffect(()=>{
        async function updateGet(){

            try{
            const res=await getById(id,localStorage.getItem('token'))
            console.log(res.message)
            if(res.message==="Failed to fetch"){
                throw new Error(res.message)
            }
            const data=res.userInfoList[0];
            setEmail(data.email)
            setName(data.ename)
            setCity(data.city)
            setRole(data.role)
        }catch(err){
            setErr(err.message)
        }

        }
        updateGet()
    },[])

    async function handleUpdate(e){
        e.preventDefault();
        try{
            // console.log(id,name,city,role,email)
            const data=await updateById(id,name,city,role,email,localStorage.getItem("token"))
            // console.log(data)
            if(data.message==="Failed to fetch"){
                throw new Error(data.message)
            }
        if(data.statusCode===200){
            navigate("/allUsers")
        }else if(data.statusCode===500){
            setCity('')
            setEmail('')
            setName('')
            setRole('')
            throw new Error("Try again later!!!")
        }
    }catch(err){
        setErr(err.message);
    }
    }
    return <div className="min-h-screen flex flex-col items-center justify-center bg-gray-500">
        {err?<p className="text-red-900">{err}</p>:!email?<p className="text-black">LOADING....</p>:null}
        <form onSubmit={handleUpdate} className="flex flex-col justify-center items-center gap-[30px]">
                <div className="flex  flex-col gap-[30px] justify-center items-center mt-[40px] bg-gray-800 text-white font-bold
                    rounded-xl p-[40px]">
                
                <div className="flex">
                    <div className="w-[100px]"><label htmlFor="id-id">ID:</label></div>
                    <input className="px-[10px] py-[2px] rounded-sm border-black border-[1px] text-black" type="text" id="id-id" value={id} readOnly></input>
                </div>

                <div className="flex">
                    <div className="w-[100px]"><label htmlFor="name-id">NAME:</label></div>
                    <input  required className="px-[10px] py-[2px] rounded-sm border-black border-[1px] text-black" type="text" id="name-id" value={name} onChange={(e)=>setName(e.target.value)}></input>
                </div>

                <div className="flex">
                    <div className="w-[100px]"><label htmlFor="email-id">EMAIL:</label></div>
                    <input required className="text-black py-[2px] px-[10px] rounded-sm border-black border-[1px]" type="text" id="email-id" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
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
                <input className="rounded-lg bg-black text-white w-[100px]" type="submit" value="SUBMIT" hidden={err?true:false}></input>
                
            </form>
    </div>
}