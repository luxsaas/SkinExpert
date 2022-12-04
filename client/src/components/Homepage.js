
import {useAuth0} from "@auth0/auth0-react";
import styled from "styled-components";
import ProductMenu from "./ProductMenu";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import LoadingPage from "./LoadingPage";
import Profile from "./Profile";
import {useNavigate} from "react-router-dom";

const Homepage =()=>{
    const {user,isAuthenticated, isLoading}=useAuth0(); 
    const {users}=useContext(UserContext);
    const [flag,setFlag]=useState(false);
    const navigate=useNavigate();
    
    //get user information
    useEffect(() => {
        if(isAuthenticated){
        fetch(`/users/${user.name}`)
        .then((res) => res.json())
        .then((data) => {
            if(data.message=="Invalid User"){
                setFlag(true);
            }
        })
        }
    }, [isAuthenticated])

    //flag checks if the user exists in the database. if it doesn't ,the user will get redirected to createaccount page
    if(flag){
        setFlag(false)
        navigate("/createAccount")
    }
    return(
        <Container>
            {(users&&!isLoading) ?<Container>
            <ProductMenu/>
            <Profile users={users} user={user}/></Container>:<LoadingPage/>}
        </Container>
    )
    
}
const Container =styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
background-color: #edf2fb;
`

export default Homepage;