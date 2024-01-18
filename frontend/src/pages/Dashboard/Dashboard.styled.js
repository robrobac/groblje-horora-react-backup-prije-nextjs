import styled from "styled-components";

export const DashboardContainer = styled.main`
    max-width: 1920px;
    width: 100%;
    display: flex;
    flex-direction: row;

`

export const DashboardSidebar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    flex: 1;
    min-width: 20%;
    gap: 50px;
    padding: 0 ${(props) => props.theme.dark.contentPadding};
`

export const ButtonsWrap = styled.div`
    display: flex;
    justify-content: end;
    gap: 16px;
`