import styled from "styled-components";

export const SinglePostContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;

    .movieAndDate {
        width: 100%;
        max-width: ${(props) => props.theme.dark.normalWidth};
        padding: 0 ${(props) => props.theme.dark.contentPadding};
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
`
