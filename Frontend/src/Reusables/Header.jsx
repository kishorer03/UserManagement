import { useNavigate } from "react-router-dom"
export default function Header(){

    const navigate=useNavigate();
    
    function handleLogout(){
        navigate("/");
    }
    
    return(
        
        <div>
            
            <ul className="bg-black h-[50px] flex justify-evenly items-center relative">
                <p className="text-white text-xl font-bold ">USER MANAGEMENT PORTAL</p>
                <button className="bg-white px-[6px]  rounded-md absolute right-[40px]" onClick={handleLogout}>LOGOUT</button>
            </ul>
             </div>
    )
}