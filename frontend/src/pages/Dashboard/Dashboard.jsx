import React from 'react'
import PostsTable from './AdminPostsTable/PostsTable'
import { Link } from 'react-router-dom'
import HelmetSettings from '../../components/HelmetSettings'

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
            <div>
                <Link to={'/dashboard/nova-recenzija'}>
                    <button>Nova Recenzija</button>
                </Link>
                <Link to={'/dashboard/novi-kratki-pregled'}>
                    <button>Novi kratki pregled</button>
                </Link>
                <PostsTable />
            </div>
        </>
    )
}
