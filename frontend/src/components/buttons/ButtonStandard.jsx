import React from 'react'
import { useNavigate } from 'react-router-dom';
import { StyledButton } from './Buttons.styled';

export default function ButtonStandard({path, variant}) {

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let redirectTo = path; 
        navigate(redirectTo);
    }

    return (
        <StyledButton onClick={routeChange}>Pročitaj više</StyledButton>
    )
}
