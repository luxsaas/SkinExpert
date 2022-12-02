import styled from "styled-components";
import {FcEmptyTrash} from "react-icons/fc";
import {BiNote} from "react-icons/bi";
import {RiCloseFill} from "react-icons/ri"
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
const Notes=({item, handleClick,handleChange, noteForm, setNoteForm,refresh,setRefresh})=>{
    const[isNoteVisible,setIsNoteVisible]=useState(false);
    const [toggle,setToggle]=useState(false);
    const {activeUser,setActiveUser}=useContext(UserContext);
    const handleNote=()=>{
        if(isNoteVisible==true){
            setIsNoteVisible(false);
        }
        else{
            setIsNoteVisible(true);
        }
    }
    const editSaveToggle=()=>{
        if(toggle==true){
            setToggle(false);
        }
        else{
            setToggle(true);
        }
    }
    const SaveNote=(_id)=>{
        if(toggle==true){
            setToggle(false);
        }
        else{
            setToggle(true);
        }
        fetch(`/message/${activeUser}/${_id}`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({message:noteForm})
        })
        .then(res=>res.json())
        .then((data)=>{
            setRefresh(refresh+1);
        })
        .catch((error)=>{
            window.alert(error);
        })

    }
    return(
        <Item>
                            <StyledImg src={item.item.img_src}></StyledImg>
                            <ButtonDiv>
                                <button onClick={()=>handleClick(item.item._id,item.item)}  ><FcEmptyTrash/></button>
                                <button onClick={handleNote}><BiNote/></button>
                            </ButtonDiv>
                            <NotesDiv style={{ visibility: isNoteVisible ? "visible" : "hidden" }}>
                                <StyledDiv>
                                    <StyledP>Notes</StyledP>
                                    <button onClick={handleNote}><RiCloseFill/></button>
                                </StyledDiv>
                                <Note style={{ display: toggle ? "none" : "block" }}>{(item.message)?(item.message.message):null}</Note>
                                <button onClick={editSaveToggle} style={{ display: toggle ? "none" : "block" }}>Edit</button>
                                
                                <NoteInput style={{ display: toggle ? "block" : "none" }} onChange={(e)=>handleChange(e)}>{(item.message)?(item.message.message):null}</NoteInput>
                                <button style={{ display: toggle ? "block" : "none" }} onClick={()=>SaveNote(item.item._id)} >Save</button>
                            </NotesDiv>
                                <Overlay style={{backgroundColor: isNoteVisible? "rgba(0,0,0,0.5)":"transparent",pointerEvents: isNoteVisible?"all":"none"}}></Overlay>
                        </Item>
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
export default Notes;