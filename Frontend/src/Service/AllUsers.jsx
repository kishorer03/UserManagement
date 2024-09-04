import { useEffect, useState } from "react"
import { getAllUsers } from "./UserService"
import { useNavigate } from "react-router-dom";

import SingleUser from './SingleUser';

export default function AllUsers(){
    const [arr,setArr]=useState([]);
    const [d,setD]=useState(true);
    const [search,setSearch]=useState('')
    const navigate=useNavigate();
    const [err,setErr]=useState('')

    
    useEffect(()=>{
        async function loadUsers() {
            try{
                const res=await getAllUsers(localStorage.getItem('token'));
                if(res.message==='Failed to fetch'){
                    throw new Error("Server is Down");
                }
                setArr(res.userInfoList)

            }catch(err){
                setErr(err.message)
                setTimeout(()=>{
                    navigate("/about-user")
                },3000)
            }
        }
        loadUsers()
    },[d])

    

    return(
        <div className="min-h-screen flex flex-col">
        <header className="relative bg-black h-[50px] flex justify-evenly items-center">
            <button className="absolute top-3 left-6 text-white" onClick={()=>{
                navigate("/about-user")
            }}>BACK</button>
            <input className="rounded-md px-[5px] text-center w-[150px]" type="text" placeholder="Enter employee id"
            value={search} onChange={(e)=>setSearch(e.target.value)}></input>
        </header>
        {err?<div className="flex-grow flex justify-center items-center"><p className="text-red-600 text-center text-2xl font-bold">{err}</p></div>:search===''? <ul className="grid grid-cols-3 gap-[40px] items-end my-[30px]">
            {arr.map(info=>{
                return <li key={info.eid} className="w-[350px] ml-[50px]">
                    <div className="relative flex flex-col gap-4 bg-gray-500 p-[30px] pb-[50px] rounded-lg"  onClick={()=>setSearch(info.eid)}>
                        <div className="flex">
                            <p className="w-24">ID:</p>
                            <p>{info.eid}</p>
                        </div>
                        <div className="flex">
                            <p className="w-24">Name:</p>
                            <p>{info.ename}</p>
                        </div>
                        <div className="flex">
                            <p className="w-24">Email:</p>
                            <p>{info.email}</p>
                        </div>
                        <div className="flex">
                            <p className="w-24">City:</p>
                            <p>{info.city}</p>
                        </div>
                        <div className="flex">
                            <p className="w-24">Role:</p>
                            <p>{info.role}</p>
                        </div>
                        
                    </div>
                </li>
            })}
        </ul>:
        <SingleUser search={search} setSearch={setSearch} d={d} setD={setD}/>}
       </div>
    )
}