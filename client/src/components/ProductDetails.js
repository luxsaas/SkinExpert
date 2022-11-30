import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductMenu from './ProductMenu';
import styled from "styled-components"

const ProductDetails=()=>{
    const {id}=useParams();
    const [item,setItem]=useState(null);
    
    useEffect(() => {
        fetch(`/product/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setItem(data.data);
          });
      }, []);

    
    console.log(item);

    return(
        <Container>
            <ProductMenu/>
            {item&&<StyledDiv>
                <div>
                    <img src={item[0].img_src}></img>
                </div>
                <div>
                    <p>{item[0].name}</p>
                    <p>{item[0].brand}</p>
                    <p>{item[0].raw_text}</p>
                    <p>{item[0].hearts}</p>
                    <p>{item[0].skin_concerns}</p>
                    <p>{item[0].skin_type}</p>
                </div>
            </StyledDiv>}
        </Container>
    )
}
const Container =styled.div`
display: flex;
flex-direction: row;
`
const StyledDiv=styled.div`
display: flex;
flex-direction: row;
`
export default ProductDetails;