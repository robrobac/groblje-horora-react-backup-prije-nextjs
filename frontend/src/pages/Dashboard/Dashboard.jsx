import React, { useState } from 'react'
import TextEditor from '../../components/TextEditor'

export default function Dashboard() {
    const [reviewTitle, setReviewTitle] = useState('This field is not used in single review')
    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [rating, setRating] = useState('')
    const [coverImage, setCoverImage] = useState('')
    const [reviewContent, setReviewContent] = useState('')
    const [imdbLink, setImdbLink] = useState('')
    const [top25, setTop25] = useState(false)
    const [worse20, setWorse20] = useState(false)
    const [error, setError] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault()

        const review = {
            reviewTitle: reviewTitle,
            movies: {
                title,
                year,
                rating,
                coverImage,
                reviewContent,
                imdbLink,
                top25,
                worse20
            }
        }

        const response = await fetch('/api/reviews', {
            method: 'POST',
            body: JSON.stringify(review),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if(response.ok) {
            setTitle('')
            setYear('')
            setRating('')
            setCoverImage('')
            setReviewContent('')
            setImdbLink('')
            setTop25(false)
            setWorse20(false)

            setError(null)
            console.log('New Review Added')
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='title'>Title</label>
                    <input
                        id='title'
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='year'>Year</label>
                    <input
                        id='year'
                        type='number'
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='rating'>Rating</label>
                    <input
                        id='rating'
                        type='number'
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='coverImage'>Cover Image</label>
                    <input
                        id='coverImage'
                        type='text'
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                    />
                </div>


                <TextEditor />


                <div>
                    <label htmlFor='reviewContent'>Review Content</label>
                    <textarea
                        id='reviewContent'
                        type='text'
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                        rows='10'
                        cols='50'
                    />
                </div>
                <div>
                    <label htmlFor='imdbLink'>Imdb Link</label>
                    <input
                        id='imdbLink'
                        type='text'
                        value={imdbLink}
                        onChange={(e) => setImdbLink(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='top25'>Top25</label>
                    <input
                        id='top25'
                        type='checkbox'
                        value={top25}
                        onChange={(e) => setTop25(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='worse20'>Worse20</label>
                    <input
                        id='worse20'
                        type='checkbox'
                        value={worse20}
                        onChange={(e) => setWorse20(e.target.value)}
                    />
                </div>
                <button>Add!</button>
            </form>
        </div>
    )
}



        

