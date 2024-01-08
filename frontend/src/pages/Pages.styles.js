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
    padding: 0 ${(props) => props.theme.dark.contentPadding};
    width: 100%;
    max-width: ${(props) => props.theme.dark.contentWidth};
`

export const ReadingSection = styled.section`
    display: flex;
    flex-direction: column;
    max-width: ${(props) => props.theme.dark.readingWidth};
    text-align: justify;
    gap: 1rem;
    color: ${(props) => props.theme.dark.lightText};
`
export const FormSection = styled.div`
    width: 100%;
    max-width: ${(props) => props.theme.dark.contentWidth};
    gap: 1rem;
    display: flex;
    flex-wrap: wrap-reverse;
`

export const MovieInfo = styled.div`
    width: 100%;
    max-width: ${(props) => props.theme.dark.contentWidth};
`