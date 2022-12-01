import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import {useDrop} from "react-dnd";
import {FcEmptyTrash} from "react-icons/fc";

const DislikeBin=({id})=>{
    const [dislike,setDislike]=useState([]);
    const dislikeArr=[];
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
    useEffect(() => {
        fetch(`/routine/${activeUser}`)
        .then((res) => res.json())
        .then((data) => {
            setDislike(data.data[0]?.Dislike);
        })
    }, [])
    const addItemToBoard=(item)=>{
        dislikeArr.push(item);
        setDislike(dislikeArr);
        fetch(`/routine/${activeUser}/Dislike`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(dislikeArr)
        })
        .then(res=>res.json())
        .then((data)=>{
        })
        .catch((error)=>{
            window.alert(error);
        })
    }
    return(
        <div>
            <p>Least Favorite</p>
            <Favorites ref={drop} style={{ backgroundColor: isOver ? 'red' : 'white' }}  >
                {dislike&&Object.values(dislike).map((item)=>{
                    return(
                        <Item>
                            <StyledImg src={item.item.img_src}></StyledImg>
                            <button><FcEmptyTrash/></button>
                        </Item>
                    )
                })}
            </Favorites>
        </div>
    )
}

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
/* cursor: move; */
&:hover{
    opacity:0.5;
}
`
const StyledImg=styled.img`
height: 100px;

`
export default DislikeBin;