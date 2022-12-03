import { useState,useEffect, useContext } from "react";
import ProductMenu from "./ProductMenu";
import styled from "styled-components";
import {useParams} from 'react-router-dom';
import Pagination from "./Pagination";
import { UserContext } from "../UserContext";
import {TiThumbsUp, TiThumbsDown} from "react-icons/ti";


const ProductFilterBrand=()=>{
    const {brand} = useParams();
    const [items,setItems]=useState([]);
    const [currentPage,setCurrentPage]=useState(1);
    const [itemsPerPage,setItemsPerPage]=useState(32);
    const {activeUser,setActiveUser} =useContext(UserContext);
    useEffect(() => {
        fetch(`/product/brand/${brand}`)
          .then((res) => res.json())
          .then((data) => {
            setItems(data.data);
          });
      }, []);

      const idxOfLastItem=currentPage*itemsPerPage;
      const idxOfFirstItem=idxOfLastItem-itemsPerPage;
      const currentItems=items.slice(idxOfFirstItem,idxOfLastItem);
      let totalItems =0;
      const paginate=(pageNumber)=>setCurrentPage(pageNumber);
      console.log(activeUser);

      const addToCurrentRoutine=(item)=>{
        const formData=item;
        fetch(`/routine/${activeUser}/${item.category}`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        })
        .then(res=>res.json())
        .then((data)=>{
        })
        .catch((error)=>{
            window.alert(error);
        })
        // window.location.reload();
      }
    return(
        <Container>
            <ProductMenu/>
            {(currentItems&&items)&&<div>
                <p>{brand}</p>
            <StyledDiv>
                {Object.values(currentItems).map((item)=>{
                    return (
                        <ProductDiv>
                        <Item href={`/products/detail/${item.id}`}>
                            <ItemDiv>
                                <StyledImg src={item.img_src}></StyledImg>
                                <StyledTitle>{item.name}</StyledTitle>
                                <StyledBrand>{item.brand}</StyledBrand>
                                <StyledRating>Rating: {item.hearts}</StyledRating>
                            </ItemDiv>
                        </Item>
                        <ButtonDiv>
                                {/* <button>{<TiThumbsUp/>}</button> */}
                                <button onClick={()=>addToCurrentRoutine(item)}>Add to Routine</button>
                                {/* <button>{<TiThumbsDown/>}</button> */}
                        </ButtonDiv>
                        </ProductDiv>
                    )}
                )}
            </StyledDiv>
            <Pagination itemsPerPage={itemsPerPage} totalItems={items.length} paginate={paginate} />
            </div>}
        </Container>
    )
}
const Container =styled.div`
display: flex;
flex-direction: row;
background-color: #edf2fb;
`
const ButtonDiv=styled.div`
display: flex;
flex-direction: row;
justify-content: center;
`
const StyledDiv=styled.div`
display: grid;
grid-template-columns: auto auto auto auto ;
`
const ProductDiv=styled.div`
display:flex;
flex-direction:column;
justify-content:center;
margin:5px;
border:2px solid #abc4ff;
`
const ItemDiv=styled.div`
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
export default ProductFilterBrand;