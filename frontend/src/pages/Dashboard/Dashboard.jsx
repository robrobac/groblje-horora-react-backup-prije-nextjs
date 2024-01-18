import React from 'react'
import PostsTable from './AdminPostsTable/PostsTable'
import { Link } from 'react-router-dom'
import HelmetSettings from '../../components/HelmetSettings'
import { SmallButton, StyledButton } from '../../components/buttons/Buttons.styled'
import { AddNewButtonsContainer, ButtonsWrap, DashboardContainer, DashboardSidebar } from './Dashboard.styled'
import DraftReviews from './draftReviews/DraftReviews'

export default function Dashboard() {
    return (
        <>
            <HelmetSettings
                title={`Dashboard - Groblje Horora`}
                description={`
                    Dashboard
                `}
                url={`https://www.groblje-horora.com/dashboard`}
                image={`%PUBLIC_URL%/images/groblje-horora-og-image.webp`}
            />
            <DashboardContainer>
                <PostsTable />
                <DashboardSidebar>
                    <ButtonsWrap>
                        <Link to={'/dashboard/nova-recenzija'}>
                            <SmallButton>Nova Recenzija</SmallButton>
                        </Link>
                        <Link to={'/dashboard/novi-kratki-pregled'}>
                            <SmallButton>Novi Kratki Pregled</SmallButton>
                        </Link>
                    </ButtonsWrap>
                    <DraftReviews />
                </DashboardSidebar>
                
                
            </DashboardContainer>
        </>
    )
}
