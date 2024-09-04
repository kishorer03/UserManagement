import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../Service/UserService";
import Header from "../Reusables/Header";
import Footer from "../Reusables/Footer";

export default function AboutUser(){
    const [info,setInfo]=useState('');
    const [err,setErr]=useState('');
    const navigate=useNavigate();
    useEffect(()=>{
        async function loadInfo() {
            try{
            const res=await getProfile(localStorage.getItem('email'),localStorage.getItem('token'))
            if(res.message==='Failed to fetch'){
              throw new Error("Server is Down");
            }
            setInfo(res.userInfoList[0]);

            }catch(err){
                setErr(err)
                setTimeout(()=>{
                    navigate("/");
                },5000)
                
            }
        }
        loadInfo();
    },[])

    localStorage.setItem('empid',info.eid)


    return(
      <div className="flex flex-col min-h-screen">
      <Header />
        <div className="flex-grow flex gap-[10px] flex-col items-center justify-center">
  {err ? err.message : info ? (
    <>
    <div className="font-serif font-bold text-xl">EMPLOYEE DETAIL</div>
    <div className="flex flex-col gap-4 bg-gray-500 p-[30px] rounded-lg">
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
    </>
  ) : (
    <p>LOADING.......</p>
  )}
</div>
{localStorage.getItem('role')==='ADMIN'?
<Footer />:null}
</div>

    )
}