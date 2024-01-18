import styled from "styled-components";

export const DraftsContainer = styled.div`
    background-color: ${(props) => props.theme.dark.commentsBG};
    border-radius: ${(props) => props.theme.dark.radiusM};
    padding: 20px;
    width: 100%;
    color: ${(props) => props.theme.dark.colorWHITE80};

    display: flex;
    flex-direction: column;
    gap: 16px;

    h3 {
        border-bottom: 1px solid ${(props) => props.theme.dark.colorWHITE50};
        padding-bottom: 4px;
        span {
            font-size: ${(props) => props.theme.dark.textS};
            font-weight: 300;
        }
    }

    .drafts {
        display: flex;
        flex-direction: column;
    }

    .draft {
        
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1;
        font-weight: 800;
        border-bottom: 1px solid ${(props) => props.theme.dark.colorWHITE15};
        &:hover {
            background-color: ${(props) => props.theme.dark.colorWHITE15};
        }

        p {
            font-weight: 400;
            padding: 5px 5px;
            
            &:first-child {
                cursor: pointer;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }

    .deleteIcon {
        cursor: pointer;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;

        
        svg {
            cursor: pointer;
            fill: ${(props) => props.theme.dark.colorWHITE50};
        }
        &:hover {
            svg {
                fill: ${(props) => props.theme.dark.colorRED};
            }
        }
    }


`