import React from 'react'
import { useNavigate } from 'react-router-dom';
import { StyledButton, TextButton } from './Buttons.styled';

export default function ButtonStandard({path, content, type}) {

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let redirectTo = path; 
        navigate(redirectTo);
    }

    if (type === 'textOnly') {
        return (
            <TextButton onClick={routeChange}>{content}</TextButton>
        )
    }

    else {
        return (
            <StyledButton onClick={routeChange}>{content}</StyledButton>
        )
    }
}
