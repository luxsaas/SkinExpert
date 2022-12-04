import ProductMenu from "./ProductMenu";
import styled from "styled-components";
import {useState,useEffect} from "react";
import {NavLink} from "react-router-dom";
const Brands=()=>{
    const [brands,setBrands]=useState(null);

    //gets list of brands
    useEffect(() => {
        fetch(`/brands`)
            .then((res) => res.json())
            .then((data) => {
            setBrands(data.data);
        });
    }, []);

    return(
        <Container>
            <ProductMenu/>
            <StyledDiv>
                <Styledh2>Brands</Styledh2>
                <StyledUl>
                    {brands&&(brands).map((brand)=>{
                        return(
                            <StyledLi><StyledLink to={`/brands/${brand}`}>{brand}</StyledLink></StyledLi>
                        )
                    })}
                </StyledUl>
            </StyledDiv>
        </Container>
    )
    
}
const Container =styled.div`
display: flex;
flex-direction: row;
background-color: #edf2fb;
`
const StyledDiv=styled.div`
`
const Styledh2=styled.h2`
    margin-left: 40px;
    font-family: serif;
`
const StyledUl=styled.ul`
columns: 4;
list-style: none;
`
const StyledLi=styled.li`
padding-bottom: 10px;
font-family: serif;
`
const StyledLink=styled(NavLink)`
text-decoration: none;
color:black;
`
export default Brands;