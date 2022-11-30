import styled from "styled-components";
import { useEffect, useState } from "react";
import ProductMenu from "./ProductMenu";
import {useParams} from 'react-router-dom';
import Pagination from "./Pagination";

const ProductFilterPage=()=>{
    const {category}=useParams();
    const [currentPage,setCurrentPage]=useState(1);
    const [itemsPerPage,setItemsPerPage]=useState(32);
    const [items,setItems]=useState([]);

      useEffect(() => {
        fetch(`/product/category/${category}`)
          .then((res) => res.json())
          .then((data) => {
            setItems(data.data);
          });
      }, []);

      const idxOfLastItem=currentPage*itemsPerPage;
      const idxOfFirstItem=idxOfLastItem-itemsPerPage;
      const currentItems=items.slice(idxOfFirstItem,idxOfLastItem);

  
      const paginate=(pageNumber)=>setCurrentPage(pageNumber);
    return(
        <Container>
            <ProductMenu/>
            {(currentItems&&items)&&<div>
                <p>{category}</p>
            <StyledDiv>
                {Object.values(currentItems).map((item)=>{
                    return (
                        <Item href={`/products/detail/${item.id}`}>
                            <ItemDiv>
                                <StyledImg src={item.img_src}></StyledImg>
                                <StyledTitle>{item.name}</StyledTitle>
                                <StyledBrand>{item.brand}</StyledBrand>
                                <StyledRating>Rating: {item.hearts}</StyledRating>
                            </ItemDiv>
                        </Item>
                    )
                })}
            </StyledDiv>
            <Pagination itemsPerPage={itemsPerPage} totalItems={items.length} paginate={paginate} />
            </div>}
        </Container>
    )
}
const Container =styled.div`
display: flex;
flex-direction: row;
`
const StyledDiv=styled.div`
display: grid;
grid-template-columns: auto auto auto auto ;
`
const ItemDiv=styled.div`
border:1px solid black;
width: 200px;
height:200px;
display:flex;
flex-direction: column;
align-items: center;
padding:10px;
color:black;
`
const StyledImg=styled.img`
width:100px;
height:100px;
`
const StyledTitle=styled.p`

text-align: center;
margin-bottom:0;
padding:0;
`
const StyledBrand=styled.p`
font-weight: bold;
margin:0;
padding:0;
`
const StyledRating =styled.p`
margin:0;
padding:0;
`
const Item=styled.a`
text-decoration: none;
`

export default ProductFilterPage;