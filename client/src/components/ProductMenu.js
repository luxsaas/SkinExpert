import styled from "styled-components";
import ProductMenuItem from "./ProductMenuItem";
import { useEffect, useState } from "react";
import {RiArrowDropDownLine} from "react-icons/ri";
import { NavLink,useNavigate } from "react-router-dom";

const ProductMenu =()=>{
    const [sidebar1,setSidebar1]=useState(false);
    const [sidebar2,setSidebar2]=useState(false);
    const navigate=useNavigate();

    const handleClick=()=>{
        if(sidebar1==false){
            setSidebar1(true);
        }
        else{
            setSidebar1(false);
        }
    }
    const handleClick2=()=>{
        if(sidebar2==false){
            setSidebar2(true);
        }
        else{
            setSidebar2(false);
        }
    }
    const handleClick3=()=>{
        navigate("/brands");
    }
    
    return(
        <Container>
            <SideBarItem>
            <Title to="/home">Profile</Title>
            <Title to="/products">Products</Title>
            <SideBarTitle  className="sidebar-title" onClick={handleClick}>
                <StyledSpan>Type of Product</StyledSpan>
                <ArrowSpan><RiArrowDropDownLine/></ArrowSpan>
            </SideBarTitle>
            <SideBarContent style={{display:sidebar1?"flex":"none"}}>
                <StyledLink to="/products/type/moisturizing-cream-oils-mists">Moisturizers</StyledLink>
                <StyledLink to="/products/type/cleanser">Cleansers</StyledLink>
                <StyledLink to="/products/type/facial-treatments">Treatments</StyledLink>
                <StyledLink to="/products/type/facial-treatment-masks">Masks</StyledLink>
                <StyledLink to="/products/type/eye-treatment-dark-circle-treatment">Eye Care</StyledLink>
                <StyledLink to="/products/type/lip-treatments">Lip Care</StyledLink>
                <StyledLink to="/products/type/sunscreen-sun-protection">Sun Care</StyledLink>
            </SideBarContent>
            <SideBarTitle  className="sidebar-title" onClick={handleClick2}>
                <StyledSpan>Skin Concern</StyledSpan>
                <ArrowSpan><RiArrowDropDownLine/></ArrowSpan>
            </SideBarTitle>
            <SideBarContent style={{display:sidebar2?"flex":"none"}}>
                <StyledLink to="/products/concern/Acne">Acne</StyledLink>
                <StyledLink to="/products/concern/Pores">Pores</StyledLink>
                <StyledLink to="/products/concern/Signs of Aging">Signs of Aging</StyledLink>
                <StyledLink to="/products/concern/Dark Spots">Dark Spots</StyledLink>
                <StyledLink to="/products/concern/Fine Lines and Wrinkles">Fine Lines and Wrinkles</StyledLink>
                <StyledLink to="/products/concern/Dullness">Dullness</StyledLink>
                <StyledLink to="/products/concern/Dark Circles">Dark Circles</StyledLink>
                <StyledLink to="/products/concern/Redness">Redness</StyledLink>
            </SideBarContent>
            <StyledNavLink to="/brands">Brands</StyledNavLink>
            <Title to="/community">Community</Title>
        </SideBarItem>
        </Container>
    )
}
const Container =styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
height:100vh;
width:200px;
padding-right:10px ;
padding-top: 100px;
flex-shrink: 0;
background-color: aliceblue;
overflow: auto;

`
const SideBarItem=styled.div`
padding:1em;
font-size: 1.2em;
display: flex;
flex-direction: column;
transition: background-color .15s;

`
const SideBarTitle=styled.div`
display:flex;
justify-content: space-between;
cursor: pointer;
&:hover{
    background-color: aqua;
}
`
const ArrowSpan =styled.span`
/* transition: transform .3s;
transform: rotate(180deg); */
`
const StyledSpan =styled.span`
display: inline-block;
width:10em;
font-size: 15px;
`
const SideBarContent =styled.div`
flex-direction: column;
padding-top:.25em;
`
const StyledLink =styled(NavLink)`
text-decoration: none;
`
const StyledNavLink =styled(NavLink)`
text-decoration: none;
font-size: 15px;
&:hover{
    background-color: aqua;
}
`
const Title =styled(NavLink)`
font-size: 25px;
margin:0;
padding:0;
text-decoration: none;
color:black;
`
export default ProductMenu;