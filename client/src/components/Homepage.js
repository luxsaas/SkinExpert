
import {useAuth0} from "@auth0/auth0-react";
import styled from "styled-components";
import ProductMenu from "./ProductMenu";
import { useState, useEffect, useContext } from "react";
import CreateAnAccount from "./CreateAccount";
import { UserContext } from "../UserContext";
import CurrentRoutine from "./CurrentRoutine";
import {useDrop} from "react-dnd";
import FavoriteBin from "./FavoriteBin";
import DislikeBin from "./DislikeBin";
import LoadingPage from "./LoadingPage";
import Profile from "./Profile";

const Homepage =()=>{
    const {user,isAuthenticated, isLoading}=useAuth0(); 
    const {users}=useContext(UserContext);
    const [flag,setFlag]=useState(false);
    useEffect(() => {
        if(isAuthenticated){
        fetch(`/users/${user.name}`)
        // fetch('users/null')
        .then((res) => res.json())
        .then((data) => {
            if(data.message!="Invalid User"){
                setFlag(true);
            }
        })
      }
    }, [isAuthenticated])

    if(isLoading){
        return<div>Loading...</div>;
    }

    return(
        <Container>
            <ProductMenu/>
            
        {(users) ?<Profile users={users} user={user}/>:<LoadingPage/>}
        </Container>
    )
    
}
const Container =styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`
const StyledRow=styled.div`
display: flex;
flex-direction: row;
`
const StyledP=styled.p`
margin-right: 5px;
`
const CurrentRoutineDiv =styled.div`
height:250px;
width:1100px;
border:1px solid blue;
display:flex;
flex-direction:row;
justify-content:start;
align-items:center;
`
export default Homepage;