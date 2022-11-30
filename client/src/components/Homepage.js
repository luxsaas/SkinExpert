import LogOutButton from "./LogOutButton";
import {useAuth0} from "@auth0/auth0-react";
import styled from "styled-components"
import ProductMenu from "./ProductMenu";
import { useState, useEffect, useContext } from "react";
import CreateAnAccount from "./CreateAccount";
import { UserContext } from "../UserContext";
import CurrentRoutine from "./CurrentRoutine";
import {useDrop} from "react-dnd";

const Homepage =()=>{
    const {user,isAuthenticated, isLoading}=useAuth0(); 
    const [users,setUsers]=useState();
    // const [routine,setRoutine]=useState();
    const [board,setBoard]=useState([]);
    const [board2,setBoard2]=useState([]);
    const [{canDrop, isOver},drop]=useDrop(()=>({
        accept:"image",
        drop:(item)=>addItemToBoard(item),
        collect:(monitor)=>({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    }))
    const [{canDrop2, isOver2},drop2]=useDrop(()=>({
        accept:"image",
        drop2:(item)=>addItemtoBoard2(item),
        collect:(monitor)=>({
            isOver2: !!monitor.isOver(),
            canDrop2: !!monitor.canDrop()
        })
    }))
    const addItemToBoard=(item)=>{
        setBoard(item);
    }
    const addItemtoBoard2=(item)=>{
        setBoard2(item);
    }
    const {activeUser,setActiveUser}=useContext(UserContext);
    useEffect(() => {
        fetch(`/users/${user?.name}`)
        .then((res) => res.json())
        .then((data) => {
            setActiveUser(data.data[0].name);
            setUsers(data.data[0]);
        })
    }, [])
    // useEffect(() => {
    //     fetch(`/routine/${user?.name}`)
    //     .then((res) => res.json())
    //     .then((data) => {
    //         setRoutine(data.data);
    //     })
    // }, [])

    if(isLoading){
        return<div>Loading...</div>;
    }
    return(
        <Container>
            <ProductMenu/>
        {(users) ?(
            <div>
                <p>Profile</p>
                <img src={user.picture} alt={user.name}></img>
                <p>{user.name}</p>
                <p>Concerns: {users.concerns}</p>
                <p>Skin Type: {users.skinType}</p>
                <p>Interested Products: {users.typeOfProducts}</p>
                <LogOutButton/>
                <p>Current Routine</p>
                <CurrentRoutineDiv>
                    <CurrentRoutine/>
                    {/* <Cleanser></Cleanser>
                    <Moisturizer></Moisturizer>
                    <Sunscreen></Sunscreen> */}
                </CurrentRoutineDiv>
                <Container >
                    <div>
                        <p>Favorites</p>
                        <Favorites ref={drop} style={{ backgroundColor: isOver ? 'red' : 'white' }}  >
                            {board&&Object.values(board).map((item)=>{
                                return(
                                    <Item>
                                        <StyledImg src={item.img_src}></StyledImg>
                                    </Item>
                                )
                            })}{canDrop ? 'Release to drop' : 'Drag your favorite items here!'}
                        </Favorites>
                    </div>
                    <div>
                        <p>DisLikes</p>
                        <Dislikes ref={drop2} style={{ backgroundColor: isOver2 ? 'red' : 'white' }} >
                        {board2&&Object.values(board2).map((item)=>{
                                return(
                                    <Item>
                                        <StyledImg src={item.img_src}></StyledImg>
                                    </Item>
                                )
                        })}
                        {canDrop2 ? 'Release to drop' : 'Drag your disliked items here!'}
                        </Dislikes>
                    </div>
                </Container>
            </div>):<CreateAnAccount name={user.name}/>}
        </Container>
    )
    
}
const Container =styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
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
const Favorites =styled.div`
height:200px;
width:500px;
border:1px solid blue;
text-align: center;
justify-content: center;
display:flex;
flex-direction: column;
`
const Dislikes =styled.div`
height:200px;
width:500px;
border:1px solid blue;
text-align: center;
justify-content: center;
display:flex;
flex-direction: column;
`
// const Cleanser=styled.div`
// `
// const Moisturizer=styled.div`
// `
// const Sunscreen =styled.div`

// `
const StyledImg=styled.img`
height: 100px;

`
const Item=styled.div`
margin:10px;
padding:10px;
border:1px solid red;
display:flex;
flex-direction: column;
align-items: center;
height:213px;
/* cursor: move; */
&:hover{
    opacity:0.5;
}
`
export default Homepage;