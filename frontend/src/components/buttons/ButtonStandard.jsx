import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { StyledButton, TextButton } from './Buttons.styled';

export default function ButtonStandard({path, content, type, span, newTab}) {

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let redirectTo = path; 
        navigate(redirectTo);
    }

    if (type === 'textOnly') {
        return (
            <Link to={path} target={newTab ? '_blank' : '_self'}>
                <TextButton>{content}</TextButton>
            </Link>
        )
    }

    if (type === 'right') {
        return (
            <Link to={path} target={newTab ? '_blank' : '_self'}>
                <StyledButton>{content} <span>{span}</span></StyledButton>
            </Link>
        )
    }

    else {
        return (
            // <StyledButton onClick={routeChange}>{content} <span>{span}</span></StyledButton>
            <Link style={{width: '100%'}} to={path} target={newTab ? '_blank' : '_self'}>
                <StyledButton>{content} <span>{span}</span></StyledButton>
            </Link>
        )
    }
}
