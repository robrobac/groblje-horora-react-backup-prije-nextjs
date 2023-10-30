import styled from "styled-components";

export const PreviewContainer = styled.article`
    flex: 1;
    display: flex;
    align-items: center;
    gap: 20px;
    height: 230px;
`

export const PreviewImage = styled.div`
    height: 100%;
    width: 160px;
    img {
        width: 160px;
        height: 100%;
        object-fit: cover;
    }
`

export const PreviewDetails = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 0;
    gap: auto;

    div {
        display: flex;
        flex-direction: column;

        h3 {
            font-size: 20px;
            font-weight: 500;
            line-height: 30px;

            span {
                word-break: keep-all;
            }
        }

        p {
            font-size: 16px;
            font-weight: 400;
            line-height: 30px;
        }
    }
`

export const QuadImageContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    width: 160px;
    height: 230px;
`

export const QuadImage = styled.div`
    width: calc(160px / 2);
    height: calc(230px / 2);

    img {
        
        object-fit: cover;
        height: 100%;
        width: 100%;
    }
`