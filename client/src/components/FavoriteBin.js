import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import {useDrop} from "react-dnd";

import Notes from "./Notes";
const FavoriteBin=({id})=>{
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
            setFavorite(data.data[0]?.Favorite);
            Object.values(favorite).map((item)=>{
                favoriteArr.push(item);
            })
            setNoteForm(favorite?.message);
        })
    }, [refresh])
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
    

    const handleChange=(e)=>{
        setNoteForm(e.target.value);
    }
    
    // console.log("Favorite", favorite);
    // console.log("Array",favoriteArr );

    return(
        <div>
            <p>Favorites</p>
            <Favorites ref={drop} style={{ backgroundColor: isOver ? 'red' : 'white' }}  >
                {favorite&&Object.values(favorite).map((item)=>{
                    if(item!=null){
                    return(
                        <Notes item={item}  handleClick={handleClick} handleChange={handleChange} noteForm={noteForm} setNoteForm={setNoteForm}refresh={refresh} setRefresh={setRefresh}/>
                    )}
                })}
            </Favorites>
        </div>
    )
}

const Note =styled.p`
border: 1px solid black;
height:7800px;
width:280px;
`
const StyledP=styled.p`
margin-right: 180px;
`
const NoteInput=styled.textarea`
width:250px;
height:300px;
margin:0;
padding: 0;
`
const StyledDiv=styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`
const Overlay=styled.div`
position:fixed;
top:0;
left:0;
right:0;
bottom:0;
`
const NotesDiv=styled.div`
&::after{
    box-sizing: border-box;
}
&::before{
    box-sizing: border-box;
}
position:fixed;
top:50%;
left:50%;
transform:translate(-50%,-50%);
border:1px solid black;
border-radius: 10px;
z-index: 10;
background-color: white;
width:300px;
height: 400px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const ButtonDiv=styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;

`
const Favorites =styled.div`
height:200px;
width:500px;
border:1px solid blue;
text-align: center;
justify-content: center;
display:flex;
flex-direction: row;
`
const Item=styled.div`
margin:10px;
padding:10px;
border:1px solid red;
display:flex;
flex-direction: column;
align-items: center;
height:150px;
`
const StyledImg=styled.img`
height: 100px;

`
export default FavoriteBin;