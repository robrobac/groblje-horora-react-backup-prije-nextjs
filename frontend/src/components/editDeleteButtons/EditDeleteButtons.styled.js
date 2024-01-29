import styled from "styled-components";

export const EditDeleteButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 2rem;
        
    svg {
            
        fill: ${(props) => props.theme.dark.grayText}
    }

    .adminBtn {
        cursor: pointer;
        width: 48px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid ${(props) => props.theme.dark.grayText};
        border-radius: ${(props) => props.theme.dark.radiusM};
    }

    @media (hover: hover) {
        .adminBtn:hover {
            border: 1px solid ${(props) => props.theme.dark.colorRED};
            svg {
                fill: ${(props) => props.theme.dark.colorRED};
            } 
        }
    }
`