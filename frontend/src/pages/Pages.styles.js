import styled from "styled-components";


export const PageContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 200px;
`

export const SinglePostContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
`

export const MovieContainer = styled.div`
    width: 100%;
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
export const FormSection = styled.div`
    width: 100%;
    max-width: ${(props) => props.theme.dark.contentWidth};
    display: flex;
    flex-wrap: wrap;
`

export const MovieInfo = styled.div`
    width: 100%;
    max-width: ${(props) => props.theme.dark.contentWidth};
`