import { useNavigate } from "react-router-dom"
export default function Footer(){

    const navigate=useNavigate();

    function handleRegister(){
        navigate("/register")
    }
    function handleAllUsers(){
        navigate("/allUsers")
    }

    return(
        <div className="bg-black h-[50px] flex justify-evenly items-center font-bold" >
            <button className="bg-white px-[6px] p-[3px] rounded-md" onClick={handleRegister}>Register</button>
                {/* <li><button className="bg-white px-[6px] p-[3px] rounded-md" onClick={()=>navigate("/searchUser")}>Search User</button></li> */}
            <button className="bg-white px-[6px] p-[3px] rounded-md" onClick={handleAllUsers}>All Users</button>
            
        </div>
    )
}