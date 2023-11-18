import React from 'react'
import NewForm from './NewForm'
import PostsTable from './AdminPostsTable/PostsTable'

export default function Dashboard() {
    return (
        <div>
            {/* <NewForm numberOfMovies={1}/> */}
            {/* <NewForm numberOfMovies={1}/> */}
            <PostsTable />
        </div>
    )
}
