import ProductMenu from "./ProductMenu";
import styled from "styled-components";
import {useState,useEffect} from "react";
import {NavLink} from "react-router-dom";
const Brands=()=>{
    const [brands,setBrands]=useState(null);

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
                <h2>Brands</h2>
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
`
const StyledDiv=styled.div`
`
const StyledUl=styled.ul`
columns: 4;
list-style: none;
`
const StyledLi=styled.li`
padding-bottom: 10px;
`
const StyledLink=styled(NavLink)`
text-decoration: none;
color:black;
`
export default Brands;