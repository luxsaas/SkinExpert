import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import {useDrop} from "react-dnd";
import {FcEmptyTrash} from "react-icons/fc";
import {BiNote} from "react-icons/bi";
import {RiCloseFill} from "react-icons/ri"
const FavoriteBin=({id})=>{
    const [favorite,setFavorite]=useState([]);
    const[isNoteVisible,setIsNoteVisible]=useState(false);
    const [noteForm,setNoteForm]=useState(null);
    let favoriteArr = [];
    const {activeUser,setActiveUser}=useContext(UserContext);
    const [{canDrop, isOver},drop]=useDrop(()=>({
        accept:"image",
        drop:(item)=>addItemToBoard(item),
        collect:(monitor)=>({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    })
    )
    const handleNote=()=>{
        if(isNoteVisible==true){
            setIsNoteVisible(false);
        }
        else{
            setIsNoteVisible(true);
        }
    }
    useEffect(() => {
        fetch(`/routine/${activeUser}`)
        .then((res) => res.json())
        .then((data) => {
            setFavorite(data.data[0]?.Favorite);
            favoriteArr=(favorite);
        })
    }, [])
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
    const handleClick=(name)=>{
        Object.values(favoriteArr).map((item)=>{
            if(item.item.name==name){
                favoriteArr.pop(item);
            }
        })
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

    const handleChange=(e)=>{
        setNoteForm(e.target.value);
    }
    
    return(
        <div>
            <p>Favorites</p>
            <Favorites ref={drop} style={{ backgroundColor: isOver ? 'red' : 'white' }}  >
                {favorite&&Object.values(favorite).map((item)=>{
                    return(
                        <Item>
                            <StyledImg src={item.item.img_src}></StyledImg>
                            <ButtonDiv>
                                <button onClick={()=>handleClick(item.item.name)}  ><FcEmptyTrash/></button>
                                <button onClick={handleNote}><BiNote/></button>
                            </ButtonDiv>
                            <NotesDiv style={{ visibility: isNoteVisible ? "visible" : "hidden" }}>
                                <StyledDiv>
                                    <p>Notes</p>
                                    <button onClick={handleNote}><RiCloseFill/></button>
                                </StyledDiv>
                                <NoteInput onChange={(e)=>handleChange(e)}></NoteInput>
                                </NotesDiv>
                                <Overlay style={{backgroundColor: isNoteVisible? "rgba(0,0,0,0.5)":"transparent",pointerEvents: isNoteVisible?"all":"none"}}></Overlay>
                        </Item>
                    )
                })}
            </Favorites>
        </div>
    )
}

const NoteInput=styled.input`
width:250px;
height:300px;
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