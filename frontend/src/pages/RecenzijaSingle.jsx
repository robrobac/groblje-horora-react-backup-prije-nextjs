import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function RecenzijaSingle() {
    const { id } = useParams()
    const [post, setPost] = useState(null)

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/reviews/${id}`)
            const data = await response.json()

            if (response.ok) {
                setPost(data)
            }
        }

        fetchPost()
    }, [id])
  return (
    <div>
      {id}
    </div>
  )
}
