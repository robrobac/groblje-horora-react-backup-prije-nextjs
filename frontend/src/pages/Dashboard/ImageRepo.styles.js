import styled from "styled-components";

export const Repo = styled.div`
    position: sticky;
    top: 87px;
`

export const RepoSection = styled.div`
    display: flex;
    justify-content: center;
`

export const RepoImages = styled.div`
    min-height: 100px;
    border: 1px solid ${(props) => props.theme.dark.inputBorder};
    padding: 10px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;

    .compressedImage {
        height: 150px;
        cursor: no-drop;
    }

    .uploadedImage {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        padding: 5px;
        border: 1px solid ${(props) => props.theme.dark.inputBorder};
        cursor: copy;
        
        @media (hover: hover) {
            &:hover {
                background-color: ${(props) => props.theme.dark.secondary};
            }
        }
    
        .deleteButton {
            cursor: pointer;
            position: absolute;
            top: 10px;
            right: 10px;
            line-height: 10px;
            font-size: 10px;
            font-weight: 800;
            background-color: ${(props) => props.theme.dark.secondary};
            padding: 7px;
        }

        .copySuccess {
            @keyframes appearAnimation {
                0% {
                    opacity: 0;
                }
                50% {
                    opacity: 1;
                }
                100% {
                    opacity: 0;
                }
            }

            position: absolute;
            width: 100px;
            text-align: center;
            top: 70px;
            background-color: green;
            animation: appearAnimation 1s ease-out;
        }


        img {
            height: 150px; 
        }

        p {
            font-size: 14px;
            text-align: center;
            -webkit-user-select: none; /* Safari */
            -ms-user-select: none; /* IE 10 and IE 11 */
            user-select: none; /* Standard syntax */

        }
    }
`

export const LinkContainer = styled.div`
    width: 100%;
`

export const StickyContainer = styled.div`
    flex: 1;
    position: sticky;
    width: 100%;
    max-width: 500px;
`
// Upload button
export const RepoFile = styled.input`
    opacity: 0;
    position: absolute;
    z-index: -1;
`
export const RepoFileLabel = styled.label`
padding: 10px;
    width: 200px;
    text-align: center;
    cursor: pointer;
    background-color: ${(props) => props.theme.dark.secondary};
    
    @media (hover: hover) {
        &:hover {
            font-weight: 600;
        }
    }

`

export const GetLinks = styled(RepoFileLabel)`

`