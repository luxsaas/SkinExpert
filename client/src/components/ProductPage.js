import ProductMenu from "./ProductMenu";
import styled from "styled-components";
import ProductMenuItem from "./ProductMenuItem";

const ProductPage =()=>{
    
    return(
        <Container>
            <ProductMenu/>
            <ProductMenuItem/>
        </Container>
    )
}
const Container =styled.div`
display: flex;
flex-direction: row;
background-color: #edf2fb;


`
export default ProductPage;