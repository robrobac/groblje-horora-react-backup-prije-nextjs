import styled from "styled-components";

export const RecenzijeHomeCoverContainer = styled.div`
    position: relative;
    height: 400px;
    padding: 0 ${(props) => props.theme.dark.contentPadding};
    margin: 100px 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    max-width: ${(props) => props.theme.dark.normalWidth};

    @media (max-width: 768px) {
        height: unset;
        gap: 20px;
    }

    .coverImage {
        height: 100%;
        object-fit: cover;
        object-position: left;
        border-radius: ${(props) => props.theme.dark.radiusM};
        -webkit-box-shadow: 0px 0px 19px -7px rgba(0,0,0,1);
        -moz-box-shadow: 0px 0px 19px -7px rgba(0,0,0,1);
        box-shadow: 0px 0px 19px -7px rgba(0,0,0,1);

        @media (max-width: 768px) {
                height: 300px;
        }
    }

    .coverContent {
        width: 100%;
        padding: 100px;
        position: absolute;
        display: flex;
        flex-direction: column;
        gap: 32px;
        align-items: flex-end;

        h2 {
            font-size: ${(props) => props.theme.dark.textHUGE};
            transition: .1s;
            text-shadow: 0px 0px 18px #141414;

            @media (hover: hover) {
                &:hover {
                    color: ${(props) => props.theme.dark.colorRED};
                }
            }

            @media (max-width: 360px) {
                font-size: ${(props) => props.theme.dark.textXXL};
            }

            @media (max-width: 230px) {
                font-size: ${(props) => props.theme.dark.textXL};
            }

            
            
        }

        @media (max-width: 768px) {
                position: relative;
                align-items: flex-start;
                padding: 0;
                gap: 20px;
        }

        a {
            @media (max-width: 768px) {
                align-items: flex-start;
                width: 100%;
            }
        }
    }
`