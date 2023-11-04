import styled from "styled-components";


export const PageContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
`

export const PageSection = styled.section`
    width: 100%;
    max-width: ${(props) => props.theme.dark.contentWidth};
`

export const ReadingSection = styled.section`
    display: flex;
    flex-direction: column;
    max-width: ${(props) => props.theme.dark.readingWidth};
    text-align: justify;
    gap: 1rem;
`
