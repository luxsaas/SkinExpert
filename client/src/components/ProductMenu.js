import styled from "styled-components";
import ProductMenuItem from "./ProductMenuItem";
import { useEffect, useState } from "react";
import {RiArrowDropDownLine} from "react-icons/ri";
import { NavLink,useNavigate } from "react-router-dom";
import LogOutButton from "./LogOutButton";
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
            <MainTitle>SkinExpert</MainTitle>
            <Title to="/home">Profile</Title>
            <Title to="/products">Products</Title>
            <SideBarTitle  className="sidebar-title" onClick={handleClick}>
                <StyledSpan>Type of Product</StyledSpan>
                <ArrowSpan><RiArrowDropDownLine/></ArrowSpan>
            </SideBarTitle>
            <SideBarContent style={{display:sidebar1?"flex":"none"}}>
                <StyledLink href="/products/type/moisturizing-cream-oils-mists">Moisturizers</StyledLink>
                <StyledLink href="/products/type/cleanser">Cleansers</StyledLink>
                <StyledLink href="/products/type/facial-treatments">Treatments</StyledLink>
                <StyledLink href="/products/type/facial-treatment-masks">Masks</StyledLink>
                <StyledLink href="/products/type/eye-treatment-dark-circle-treatment">Eye Care</StyledLink>
                <StyledLink href="/products/type/lip-treatments">Lip Care</StyledLink>
                <StyledLink href="/products/type/sunscreen-sun-protection">Sun Care</StyledLink>
            </SideBarContent>
            <SideBarTitle  className="sidebar-title" onClick={handleClick2}>
                <StyledSpan>Skin Concern</StyledSpan>
                <ArrowSpan><RiArrowDropDownLine/></ArrowSpan>
            </SideBarTitle>
            <SideBarContent style={{display:sidebar2?"flex":"none"}}>
                <StyledLink href="/products/concern/Acne">Acne</StyledLink>
                <StyledLink href="/products/concern/Pores">Pores</StyledLink>
                <StyledLink href="/products/concern/Signs of Aging">Signs of Aging</StyledLink>
                <StyledLink href="/products/concern/Dark Spots">Dark Spots</StyledLink>
                <StyledLink href="/products/concern/Fine Lines and Wrinkles">Fine Lines and Wrinkles</StyledLink>
                <StyledLink href="/products/concern/Dullness">Dullness</StyledLink>
                <StyledLink href="/products/concern/Puffy Eyes">Puffy Eyes</StyledLink>
                <StyledLink href="/products/concern/Redness">Redness</StyledLink>
                <StyledLink href="/products/concern/Dryness">Dryness</StyledLink>
                <StyledLink href="/products/concern/Hyperpigmentation">Hyperpigmentation</StyledLink>
            </SideBarContent>
            <StyledNavLink href="/brands">Brands</StyledNavLink>
            {/* <Title to="/community">Community</Title> */}
            <LogOutButton/>
        </SideBarItem>
        </Container>
    )
}
const Container =styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
min-height: 800px;
width:200px;
padding-right:10px ;
flex-shrink: 0;
background-color: #edf2fb;
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
    background-color: #d7e3fc;
}
margin-bottom: 10px;
`
const ArrowSpan =styled.span`
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
const StyledLink =styled.a`
text-decoration: none;
`
const StyledNavLink =styled.a`
text-decoration: none;
font-size: 15px;
&:hover{
    background-color: #d7e3fc;
}
margin-bottom: 10px;
`
const Title =styled(NavLink)`
font-size: 25px;
padding:0;
text-decoration: none;
color:black;
margin-bottom: 10px;
`
const MainTitle= styled.h1`
font-size: 30px;
font-family: serif;
color: #abc4ff;
padding-bottom: 50px;
`
export default ProductMenu;