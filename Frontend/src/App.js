import Login from './Auth/LoginPage';
import RegisterPage from './Auth/RegisterPage';
import AboutUser from './Info/AboutUser';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import AllUsers from './Service/AllUsers';
// import SingleUser from './Service/SingleUser';
import UpdateUser from './Service/UpdateUser';



export default function App() {


  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/about-user" element={<AboutUser />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/allUsers" element={<AllUsers />}/>
        {/* <Route path="/searchUser" element={<SingleUser />} /> */}
        <Route path="/updateUser/:id" element={<UpdateUser />} />
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}
