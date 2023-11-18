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
        min-height: 50px;
        border-right: solid 1px #ffffff15;
        &:last-child {
            border-right: unset;
        }
    }

    .title {
        flex: 4;
    }
    .category {
        flex: 3;
    }
    .datePublished, .dateEdited, .rating {
        flex: 2;
    }
`