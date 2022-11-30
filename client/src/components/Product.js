import styled from "styled-components";
import {useDrag} from "react-dnd";

const Product=({item,id})=>{

    const [{isDragging},drag]=useDrag(()=>({
        type:"image",
        item:{item:item},
        collect:(monitor)=>({
            isDragging:!!monitor.isDragging(),
        }),
    }));
    return(
        <Item style={{border: isDragging?"5px solid pink":"0px solid pink"}} ref={drag}>
            <p>{id}</p>
            <StyledImg src={item.img_src}></StyledImg>
            <p>{item.name}</p>
        </Item>
    )

}

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
const StyledImg=styled.img`
height: 100px;

`
export default Product;