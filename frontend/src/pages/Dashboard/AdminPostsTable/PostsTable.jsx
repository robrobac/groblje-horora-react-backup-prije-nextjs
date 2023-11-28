import React from 'react'
import { PaginationContainer, TableContainer, TableItem } from './PostsTable.styled'
import Rating from '../../../components/Rating'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Link } from 'react-router-dom';
import { PageContainer, PageSection } from '../../Pages.styles';
import Search from '../../../components/searchBar/Search';
import { SORT_OPTIONS } from '../../../helpers/sortOptions';
import useFetchReviewsWithParams from '../../../hooks/useFetchReviewsWithParams';

export default function PostsTable() {

    const {
        handleSearch,
        search,
        sort,
        order,
        handleSortAndOrder,
        reviews,
        totalPages,
        handlePageChange,
        page
    } = useFetchReviewsWithParams('dashboard', SORT_OPTIONS.CREATED, 'desc', 4)

    return (
        <PageContainer>
            <PageSection>
                <Search controls={false} handleSearch={handleSearch} search={search} sort={sort} order={order} handleSortAndOrder={handleSortAndOrder}/>
                <TableContainer>
                    <TableItem className="tableItem">
                        <div
                            className='title tableHeader'
                            style={{pointerEvents: search ? 'none' : 'auto'}}
                            onClick={() => handleSortAndOrder(SORT_OPTIONS.TITLE, order)}>
                                Title<span>{sort === 'reviewTitle' && !search ? (order === 'desc' ? '🔽' : '🔼') : ''}</span>
                        </div>
                        <div
                            className='category tableHeader'
                            style={{pointerEvents: search ? 'none' : 'auto'}}
                            onClick={() => handleSortAndOrder(SORT_OPTIONS.CATEGORY, order)}>
                                Category <span>{sort === 'reviewType' && !search ? (order === 'desc' ? '🔽' : '🔼') : ''}</span>
                        </div>
                        <div
                            className='rating tableHeader'
                            style={{pointerEvents: search ? 'none' : 'auto'}}
                            onClick={() => handleSortAndOrder(SORT_OPTIONS.RATING, order)}>
                                Rating <span>{sort === 'movies.0.rating' && !search ? (order === 'desc' ? '🔽' : '🔼') : ''}</span>
                        </div>
                        <div
                            className='datePublished tableHeader'
                            style={{pointerEvents: search ? 'none' : 'auto'}}
                            onClick={() => handleSortAndOrder(SORT_OPTIONS.CREATED, order)}>
                                Date Published <span>{sort === 'createdAt' && !search ? (order === 'desc' ? '🔽' : '🔼') : ''}</span>
                        </div>
                        <div
                            className='dateEdited tableHeader'
                            style={{pointerEvents: search ? 'none' : 'auto'}}
                            onClick={() => handleSortAndOrder(SORT_OPTIONS.UPDATED, order)}>
                                Date Edited <span>{sort === 'updatedAt' && !search ? (order === 'desc' ? '🔽' : '🔼') : ''}</span>
                        </div>
                    </TableItem>
                    {reviews?.map((review) => (
                        <TableItem className="tableItem">
                            <div className='title'><Link to={`/recenzije/${review._id}`}>{review.reviewTitle}</Link></div>
                            <div className='category'>{review.reviewType === 'single' ? 'Recenzija' : 'Kratki pregled'}</div>
                            <div className='rating'>
                                {review.reviewType === 'single' ? <Rating rating={review.movies[0].rating} /> : ''}
                            </div>
                            <div className='datePublished'>{formatDistanceToNow(new Date(review.createdAt), {addSuffix: true})}</div>
                            <div className='dateEdited'>{formatDistanceToNow(new Date(review.updatedAt), {addSuffix: true})}</div>
                        </TableItem>
                    ))}
                </TableContainer>
                <PaginationContainer>
                {totalPages?.map((pageNumber, index) => (
                    <button onClick={() => handlePageChange(pageNumber)} disabled={index +1 === page}>{pageNumber}</button>
                ))}
                </PaginationContainer>
            </PageSection>
        </PageContainer>
    )
}
