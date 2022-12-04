import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import {useDrop} from "react-dnd";

import Notes from "./Notes";
const FavoriteBin=()=>{
    const [favorite,setFavorite]=useState([]);
    const [refresh,setRefresh]=useState(1);
    const {activeUser,setActiveUser}=useContext(UserContext);
    const [noteForm,setNoteForm]=useState(null);
    let favoriteArr = [];
// logic to implement the Drop technique
    const [{canDrop, isOver},drop]=useDrop(()=>({
        accept:"image",
        drop:(item)=>addItemToBoard(item),
        collect:(monitor)=>({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    })
    )
//get message for the items in dislike bin
    useEffect(() => {
        fetch(`/routine/${activeUser}`)
        .then((res) => res.json())
        .then((data) => {
            setFavorite(data.data[0]?.Favorite);
            Object.values(favorite).map((item)=>{
                favoriteArr.push(item);
            })
            setNoteForm(favorite?.message);
        })
    }, [refresh])
//adds item to dislike bin when item is dropped in dislike bin 
    const addItemToBoard=(item)=>{
        favoriteArr.push(item);
        setFavorite(favoriteArr);
        fetch(`/routine/${activeUser}/Favorite`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(favoriteArr)
        })
        .then(res=>res.json())
        .then((data)=>{
        })
        .catch((error)=>{
            window.alert(error);
        })
    }
//updates the dislike bin when the message/note is saved
    const handleClick=(_id,item)=>{
        fetch(`/routine/${activeUser}/${_id}`,{
            method:"PATCH",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        })
        .then(res=>res.json())
        .then((data)=>{
        })
        // .catch((error)=>{
        //     window.alert(error);
        // })
        setRefresh(refresh+1);


    }
    
    //takes the changes in the note and updates noteform
    const handleChange=(e)=>{
        setNoteForm(e.target.value);
    }

    return(
        <Container>
            <Styledh3>Favorites</Styledh3>
            <Favorites ref={drop} style={{ backgroundColor: isOver ? '#c1d3fe' : '#edf2fb' }}  >
                {favorite&&Object.values(favorite).map((item)=>{
                    if(item!=null){
                    return(
                        <Notes item={item}  handleClick={handleClick} handleChange={handleChange} noteForm={noteForm} setNoteForm={setNoteForm}refresh={refresh} setRefresh={setRefresh} />
                    )}
                })}
            </Favorites>
        </Container>
    )
}

const Container=styled.div`
`
const Favorites =styled.div`
height:200px;
width:500px;
border:5px solid #abc4ff;
text-align: center;
justify-content: center;
display:flex;
flex-direction: row;

`
const Styledh3=styled.h3`
font-family: serif;
`

export default FavoriteBin;