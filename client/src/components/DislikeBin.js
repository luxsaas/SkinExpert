import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import {useDrop} from "react-dnd";

import Notes from "./Notes";
const DislikeBin=({id})=>{
    const [favorite,setFavorite]=useState([]);
    const [refresh,setRefresh]=useState(1);
    const {activeUser,setActiveUser}=useContext(UserContext);
    const [noteForm,setNoteForm]=useState(null);
    let favoriteArr = [];

    const [{canDrop, isOver},drop]=useDrop(()=>({
        accept:"image",
        drop:(item)=>addItemToBoard(item),
        collect:(monitor)=>({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    })
    )

    useEffect(() => {
        fetch(`/routine/${activeUser}`)
        .then((res) => res.json())
        .then((data) => {
            setFavorite(data.data[0]?.Dislike);
            Object.values(favorite).map((item)=>{
                favoriteArr.push(item);
            })
            setNoteForm(favorite?.message);
        })
    }, [refresh])
    const addItemToBoard=(item)=>{
        favoriteArr.push(item);
        setFavorite(favoriteArr);
        fetch(`/routine/${activeUser}/Dislike`,{
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
    const handleClick=(_id,item)=>{
        fetch(`/routine2/${activeUser}/${_id}`,{
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
    

    const handleChange=(e)=>{
        setNoteForm(e.target.value);
    }

    return(
        <div>
            <Styledh3>Least Favorites</Styledh3>
            <Favorites ref={drop} style={{ backgroundColor: isOver ? '#c1d3fe' : '#edf2fb'  }}  >
                {favorite&&Object.values(favorite).map((item)=>{
                    if(item!=null){
                    return(
                        <Notes item={item}  handleClick={handleClick} handleChange={handleChange} noteForm={noteForm} setNoteForm={setNoteForm} refresh={refresh} setRefresh={setRefresh} key="Dislike"/>
                    )}
                })}
            </Favorites>
        </div>
    )
}

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
export default DislikeBin;