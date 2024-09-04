
const base_url=process.env.REACT_APP_API_URL;

export async function login(email,password) {
  let inp_data={
    "email":email,
    "pass":password
}
  try{
  const res=await fetch(`${base_url}/auth/login`,{
    method:'POST',
    headers:{
      'Content-type':'application/json',
    },
    body:JSON.stringify(inp_data)
  })

  const data=await res.json();
  return data;
}catch(err){
  return err;
}
}

export async function register(ename,city,role,email,password,token) {
  let inp_data={
    "ename":ename,
    "city":city,
    "role":role,
    "email":email,
    "pass":password
}
  try{
  const res=await fetch(`${base_url}/admin/register`,{
    method:'POST',
    headers:{
      'Content-type':'application/json',
      'Authorization':`Bearer ${token}`
    },
    body:JSON.stringify(inp_data)
  })

  const data=await res.json();
  return data;
}catch(err){
  console.log(err);
}
}
export async function getAllUsers(token) {

  try{
  const res=await fetch(`${base_url}/admin/getAllUsers`,{
    method:'GET',
    headers:{
      'Content-type':'application/json',
      'Authorization':`Bearer ${token}`
    },
  })

  const data=await res.json();
  return data;
}catch(err){
  return err;
}
}

export async function getById(id,token,controller) {
  let res;
  try{
  if(controller){
    res=await fetch(`${base_url}/admin/getById/${id}`,{
    method:'GET',
    headers:{
      'Content-type':'application/json',
      'Authorization':`Bearer ${token}`
    },
  },{signal:controller.signal})
  }else{
    res=await fetch(`${base_url}/admin/getById/${id}`,{
      method:'GET',
      headers:{
        'Content-type':'application/json',
        'Authorization':`Bearer ${token}`
      },
    })
  }
  
  
  const data=await res.json();
  return data;
}catch(err){
  return err;
}
}

export async function updateById(id,ename,city,role,email,token) {
  let inp_data={
    "ename":ename,
    "city":city,
    "role":role,
    "email":email,
  };
  try{
  const res=await fetch(`${base_url}/admin/update/${id}`,{
    method:'PUT',
    headers:{
      'Content-type':'application/json',
      'Authorization':`Bearer ${token}`
    },
    body:JSON.stringify(inp_data)
  })
  
  const data=await res.json();
  return data;
}catch(err){
  console.log(err);
}
}

export async function deleteById(id,token) {
  try{
  const res=await fetch(`${base_url}/admin/delete/${id}`,{
    method:'DELETE',
    headers:{
      'Content-type':'application/json',
      'Authorization':`Bearer ${token}`
    },
  })
  
  const data=await res.json();
  return data;
}catch(err){
  return err;
}
}


export async function getProfile(email,token) {
  try{
  const res=await fetch(`${base_url}/adminuser/getProfile`,{
    method:'POST',
    headers:{
      'Content-type':'application/json',
      'Authorization':`Bearer ${token}`
    },
    body:JSON.stringify({email:email})
  })
  
  const data=await res.json();
  return data;
}catch(err){
  return err;
}
}


// function isAuthenticated(){
//   return localStorage.getItem('token')?true:false;
// }

// function isUser(){
//   return localStorage.getItem('role')==='USER';
// }

// function isAdmin(){
//   return localStorage.getItem('role')==='ADMIN';
// }