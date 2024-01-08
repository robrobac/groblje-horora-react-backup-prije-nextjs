import styled from "styled-components";
import { NavLink } from 'react-router-dom';

export const AuthPage = styled.div`
    position: absolute;
    top: 0;
    padding: 50px ${(props) => props.theme.dark.contentPadding};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 80px;
    width: 100vw;
    min-height: 100vh;
    z-index: 150;
    background-position: center;
    background-size: cover;

    svg {
        scale: 2;
        filter: drop-shadow(0px 0px 25px #000000);
        fill: ${(props) => props.theme.dark.colorWHITE};
    }
`

export const AuthContainer = styled.div`
    background-color: ${(props) => props.theme.dark.background};
    width: 100%;
    max-width: 500px;
    padding: 2rem;
    border-radius: 20px;
    -webkit-box-shadow: 0px 0px 24px 1px rgba(0,0,0,0.6); 
    box-shadow: 0px 0px 24px 1px rgba(0,0,0,0.6);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    opacity: .9;

    p {
        text-align: center;
    }

    .error {
        font-size: .8rem;
        font-weight: 600;
        color: red;
    }

    p:last-of-type {
        color: #ffffff60;
    }

    p.separator {
        width: 100%;
        display: flex;
        align-items: center;
        text-align: center;
        font-weight: 200;

        &::before, &::after {
            content: '';
            flex: 1;
            border-bottom: 1px solid #ffffff60;
        }
        &:not(empty)::before {
            margin-right: 1rem;
        }
        &:not(empty)::after {
            margin-left: 1rem;
        }
    }
`

export const LogoutLink = styled.span`
    text-decoration: none;
    cursor: pointer;
    color: ${(props) => props.theme.dark.colorWHITE};

    @media (hover: hover) {
        &:hover {
            text-decoration: underline;
        }
    }
`

export const RedirectLink = styled(NavLink)`
        text-decoration: none;
        cursor: pointer;
        color: ${(props) => props.theme.dark.colorWHITE};


        @media (hover: hover) {
            &:hover {
                text-decoration: underline;
            }
        }
`

export const AuthForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
`

export const GoogleLoginButton = styled.button`
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 10px 16px 10px 16px;
    border: none;
    border-radius: 3px;
    background-color: #ffffff10;
    color: ${(props) => props.theme.dark.lightText};
    font-size: 14px;

    svg {
        scale: 1.3;
    }

    @media (hover: hover) {
        &:hover {
            -webkit-box-shadow: 0px 0px 24px 1px rgba(0,0,0,0.5); 
            box-shadow: 0px 0px 15px 5px rgba(0,0,0,0.5);
        }
    }
    
    &:focus {
        outline: none;
        -webkit-box-shadow: 0px 0px 24px 1px rgba(0,0,0,0.5); 
        box-shadow: 0px 0px 15px 5px rgba(0,0,0,0.5);
    }

    &:disabled {
        opacity: .5;
        cursor: not-allowed;
        -webkit-box-shadow: none; 
        box-shadow: none;
    }
    
`

export const VerifyEmailContainer = styled.div`
    position: fixed;
    z-index: 10000;
    background-color: ${(props) => props.theme.dark.colorBLACK};
    width: 100vw;
    height: 100vh;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const VerifyMessageWrap = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${(props) => props.theme.dark.contentPadding};
    max-width: 500px;
    gap: 1rem;
    align-items: center;

    div {
        display: flex;
        gap: 20px;
    }

    h5 {
        font-size: ${(props) => props.theme.dark.textXXL};
        text-align: center;
    }
    
    p {
        font-size: ${(props) => props.theme.dark.textM};
        text-align: center;
    }
`