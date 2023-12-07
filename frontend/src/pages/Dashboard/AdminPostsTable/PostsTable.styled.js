import styled from "styled-components";

export const TableContainer = styled.div`
    display: flex;
    flex-direction: column;

    > :nth-child(even) {
        background-color: #ffffff09;
    }
`

export const TableItem = styled.div`
    display: flex;
    
    .tableHeader {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none; /* Standard syntax */
        border-bottom: solid 1px #ffffff30;
    }

    > * {
        padding: 10px 10px;
        min-height: 75px;
        border-right: solid 1px #ffffff15;
        display: flex;
        align-items: center;
        &:last-child {
            border-right: unset;
        }
    }

    .title {
        display: flex;
        justify-content: space-between;
        flex: 5;

        & > a {
            text-decoration: none;
            color: ${(props) => props.theme.dark.lightText};
            display: inline;
            cursor: pointer;
            padding-bottom: 2px;
            &:hover {
                border-bottom: 1px solid white;
            }
        }
    }
    .category {
        flex: 2;
    }
    .datePublished, .dateEdited, .rating {
        flex: 2;
    }

    .icons {
        padding-left: 10px;
        display: none;
        
        svg {
            cursor: pointer;
            fill: ${(props) => props.theme.dark.grayText}
        }

        svg:first-child:hover {
            fill: ${(props) => props.theme.dark.lightText};
        }

        svg:last-child:hover {
            fill: ${(props) => props.theme.dark.secondary};
        }


        
    }

    &:hover {
        .icons {
            display: flex;
            gap: .5rem;
        }
    }
`