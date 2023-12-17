import React from 'react'
import PostsTable from './AdminPostsTable/PostsTable'
import { Link } from 'react-router-dom'

export default function Dashboard() {
    return (
        <div>
            <Link to={'/dashboard/nova-recenzija'}>
                <button>Nova Recenzija</button>
            </Link>
            <Link to={'/dashboard/novi-kratki-pregled'}>
                <button>Novi kratki pregled</button>
            </Link>
            <PostsTable />
        </div>
    )
}
