import { useState,useEffect } from "react";
import { getById } from "./UserService";
import { useNavigate } from "react-router-dom";
import { deleteById } from "./UserService";


export default function SingleUser({search,setSearch,d,setD}){

    // const [search,setSearch]=useState('')
    const [err,setErr]=useState('')
    const [info,setInfo]=useState('')
    const navigate=useNavigate();

    useEffect(()=>{
        const controller=new AbortController();
        async function searchSingleUser(){
            setInfo('')
            setErr('')
           try{ 
            if(search>0){
            const res=await getById(search,localStorage.getItem('token'),controller)
            if(res.message==='Failed to fetch'){
                throw new Error("Server is Down");
            }
            if(res.statusCode===404){
                throw new Error(res.message)
            }else if(res.statusCode===500){
                throw new Error("Data fetching Failed")
            }
            setInfo(res.userInfoList[0]);
            // console.log(res);
            }
        }catch(err){
            setErr(err.message);
        }
        }
        searchSingleUser();

        return function(){
            controller.abort();
        }
    },[search])

    async function handleDelete(id){
      // eslint-disable-next-line
      let conformation=confirm("Are you sure??");
      if(conformation){
        try{
          const res=await deleteById(id,localStorage.getItem('token'));
          if(res.message==='Failed to fetch' || res.statusCode===500){
            throw new Error("Server is Down");
          }
          setSearch('')
          setD(!d);
        }catch(err){
          setErr(err.message)
        }
      }      
  }


  return <div className="flex-grow flex flex-col">
        
        {/* <header className="bg-black h-[50px] flex justify-evenly items-center">
            <input className="rounded-md px-[5px] text-center w-[150px]" type="text" placeholder="Enter employee id"
            value={search} onChange={(e)=>setSearch(e.target.value)}></input>
        </header> */}


        <div className="flex-grow flex gap-[10px] flex-col items-center justify-center">
  {search===''?<p className="text-2xl italic font-semibold">SEARCH FOR AN EMPLOYEE</p>:
  err ? <p className="text-red-600">{err}</p> : info ? (
    <>
    <div className="font-serif font-bold text-xl">EMPLOYEE DETAILS</div>
    <div className="relative flex flex-col gap-4 bg-gray-500 p-[60px] rounded-lg">
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
      {Number(info.eid)===Number(localStorage.getItem('empid'))?null:<div className="absolute bottom-6 right-1 flex justify-evenly w-[150px]">
          <button onClick={()=>navigate(`/updateUser/${info.eid}`)}>✏️</button>
          {info.role==='USER'?<button onClick={()=>handleDelete(info.eid)}>🗑️</button>:null}
                            
      </div>}
      
    </div>
    <button className="rounded-lg bg-black text-white w-[100px] py-[5px] mt-[20px]" onClick={()=>setSearch('')}>{"BACK"}</button>
    </>
  ) : (
    <p>LOADING.......</p>
  )
} 
</div>
  </div>
}