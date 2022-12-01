import styled from "styled-components";
import {useDrag} from "react-dnd";
import {FcEmptyTrash} from "react-icons/fc";
import { useContext } from "react";
import { UserContext } from "../UserContext";
const Product=({item,id})=>{
    const {activeUser,setActiveUser}=useContext(UserContext);
    const [{isDragging},drag]=useDrag(()=>({
        type:"image",
        item:{item:item},
        collect:(monitor)=>({
            isDragging:!!monitor.isDragging(),
        }),
    }));

    const handleClick=(category)=>{
        
        console.log("hi");
        fetch(`/routine/${activeUser}/${category}`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(null)
        })
        .then(res=>res.json())
        .then((data)=>{
        })
        .catch((error)=>{
            window.alert(error);
        })
            .then((res) => res.json())
            .then((data) => {});
    }
    console.log(activeUser);
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
margin:10px;
padding:10px;
border:1px solid red;
display:flex;
flex-direction: column;
align-items: center;
height:180px;
/* cursor: move; */
&:hover{
    opacity:0.5;
}
`
const StyledImg=styled.img`
height: 100px;

`
export default Product;