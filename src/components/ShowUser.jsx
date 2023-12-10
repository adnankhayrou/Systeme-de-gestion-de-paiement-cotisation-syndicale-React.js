import NavBar from './NavBar'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ShowUser = () => {

    const [user, setUser] = useState([]);
    
    const location = useLocation();
    let formData = location.state?.formData;
    // console.log(formData)
    
    useEffect(() => {
        axios.get(`http://localhost:3000/api/auth/GetUser/${formData.email}`)
            .then(res => {
                if(res.data){
                const user1 = res.data.user.name;
                setUser(user1);
                console.log(user1);
                }
            })
    },[formData]) 

  return (
    <>
    <NavBar/>
    hello
    <div>this is the user name : {user}</div>
    </>
  )
}

export default ShowUser