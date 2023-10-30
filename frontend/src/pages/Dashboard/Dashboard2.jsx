import React, { useState } from 'react';

export default function Dashboard2() {
    const [reviewTitle, setReviewTitle] = useState('')
    const [movies, setMovies] = useState([
        {
            title: '',
            year: '',
            rating: '',
            coverImage: '',
            reviewContent: '',
            imdbLink: '',
            top25: false,
            worse20: false,
        },
        {
            title: '',
            year: '',
            rating: '',
            coverImage: '',
            reviewContent: '',
            imdbLink: '',
            top25: false,
            worse20: false,
        },
        {
            title: '',
            year: '',
            rating: '',
            coverImage: '',
            reviewContent: '',
            imdbLink: '',
            top25: false,
            worse20: false,
        },
        {
            title: '',
            year: '',
            rating: '',
            coverImage: '',
            reviewContent: '',
            imdbLink: '',
            top25: false,
            worse20: false,
        },
    ]);

    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reviews = movies.map((movie) => {
            return {
                title: movie.title,
                year: movie.year,
                rating: movie.rating,
                coverImage: movie.coverImage,
                reviewContent: movie.reviewContent,
                imdbLink: movie.imdbLink,
                top25: movie.top25,
                worse20: movie.worse20,
            };
        });

        const review = {
            reviewTitle: reviewTitle,
            movies: reviews,
        };

        const response = await fetch('/api/reviews', {
            method: 'POST',
            body: JSON.stringify(review),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            // Reset the movie form fields
            setMovies([
                {
                    title: '',
                    year: '',
                    rating: '',
                    coverImage: '',
                    reviewContent: '',
                    imdbLink: '',
                    top25: false,
                    worse20: false,
                },
                {
                    title: '',
                    year: '',
                    rating: '',
                    coverImage: '',
                    reviewContent: '',
                    imdbLink: '',
                    top25: false,
                    worse20: false,
                },
                {
                    title: '',
                    year: '',
                    rating: '',
                    coverImage: '',
                    reviewContent: '',
                    imdbLink: '',
                    top25: false,
                    worse20: false,
                },
                {
                    title: '',
                    year: '',
                    rating: '',
                    coverImage: '',
                    reviewContent: '',
                    imdbLink: '',
                    top25: false,
                    worse20: false,
                },
            ]);
            setReviewTitle('')
            setError(null);
            console.log('New Reviews Added');
        }
    };

    const handleMovieChange = (index, field, value) => {
        const updatedMovies = [...movies];
        updatedMovies[index][field] = value;
        setMovies(updatedMovies);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Review Title</label>
                <input id='reviewTitle' value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)}/>
                {movies.map((movie, index) => (
                    <div key={index}>
                        <h2>Movie {index + 1}</h2>
                        <label htmlFor={`title${index}`}>Title</label>
                        <input
                            id={`title${index}`}
                            type="text"
                            value={movie.title}
                            onChange={(e) => handleMovieChange(index, 'title', e.target.value)}
                        />
                        </div>
                        ))}
                        <button>Add!</button>
                    </form>
                </div>
            );
        }