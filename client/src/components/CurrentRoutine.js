import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import Product from "./Product";
const CurrentRoutine=()=>{
    const [routine,setRoutine]=useState();
    const {activeUser,setActiveUser}=useContext(UserContext);
    useEffect(() => {
        fetch(`/routine/${activeUser}`)
        .then((res) => res.json())
        .then((data) => {
            setRoutine(data.data[0]);
        })
    }, [])
    return(
        <Container>
            {routine?.Cleanser&&
                <Product item={routine.Cleanser} id="Cleanser"/>
                }
            {routine?.Moisturizer&&
                <Product item={routine.Moisturizer} id="Moisturizer"/>
                }
            {routine?.SunScreen&&
                <Product item={routine.SunScreen} id="Sun Screen"/>
                    }
            {routine?.Treatment&&
                <Product item={routine.Treatment} id="Treatment"/>
                    }
            {routine?.Mask&&
                <Product item={routine.Mask} id="Mask"/>
                    }
            {routine?.EyeCare&&
                <Product item={routine.EyeCare} id="Eye Care"/>
                    }
            {routine?.LipCare&&
                <Product item={routine.LipCare} id="Lip Care"/>
                    }
        </Container>
    )
}
const Container=styled.div`
display: flex;
flex-direction: row;
`
export default CurrentRoutine;