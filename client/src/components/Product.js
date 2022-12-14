import styled from "styled-components";
import {useDrag} from "react-dnd";
import {FcEmptyTrash} from "react-icons/fc";
import { useContext } from "react";
import { UserContext } from "../UserContext";
const Product=({item,id,refresh,setRefresh})=>{
    const {activeUser,setActiveUser}=useContext(UserContext);
    const [{isDragging},drag]=useDrag(()=>({
        type:"image",
        item:{item:item},
        collect:(monitor)=>({
            isDragging:!!monitor.isDragging(),
        }),
    }));
//removes item from current routine bin
    const handleClick=(category)=>{
        
        fetch(`/currentroutine/${activeUser}/${category}`,{
            method:"PATCH",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
        })
        .then(res=>res.json())
        .then((data)=>{
        })
        // .catch((error)=>{
        //     window.alert(error);
        // })
            setRefresh(refresh+1);
    }

    return(
        <Container>
            <Item style={{border: isDragging?"5px solid pink":"0px solid pink"}} ref={drag}>
                <p>{id}</p>
                <StyledImg src={item.img_src}></StyledImg>
                <p>{item.name}</p>
            </Item>
            <ButtonDiv>
                <button onClick={()=>handleClick(item.category)}><FcEmptyTrash/></button>
            </ButtonDiv>
        </Container>
    )

}
const Container =styled.div`
display:flex;
flex-direction: column;
justify-content: center;
`
const ButtonDiv=styled.div`
display: flex;
flex-direction: row;
justify-content: center;
`
const Item=styled.div`
padding:10px;
border:1px solid red;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
height:200px;
width: 200px;

&:hover{
    opacity:0.5;
}
`
const StyledImg=styled.img`
height: 100px;

`
export default Product;