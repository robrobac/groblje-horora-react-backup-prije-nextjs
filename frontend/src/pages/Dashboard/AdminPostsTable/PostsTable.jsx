import React from 'react'
import { TableContainer, TableItem } from './PostsTable.styled'
import Rating from '../../../components/Rating'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Link } from 'react-router-dom';
import { PageContainer, PageSection } from '../../Pages.styles';
import Search from '../../../components/searchBar/Search';
import { SORT_OPTIONS } from '../../../helpers/sortOptions';
import useFetchReviewsWithParams from '../../../hooks/useFetchReviewsWithParams';
import {ReactComponent as DeleteIcon} from '../../../images/deleteicon.svg'
import {ReactComponent as EditIcon} from '../../../images/editicon.svg'
import Pagination from '../../../components/pagination/Pagination';
import { deleteImageFromFirebaseStorage } from '../../../helpers/firebaseUtils';

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
        page,
        handleRefresh,
        totalItems
    } = useFetchReviewsWithParams('dashboard', SORT_OPTIONS.CREATED, 'desc', 10)

    const handleDelete = async (review) => {
        let imagesToDelete = []

        if (review.contentImages) {
            review.contentImages.forEach((image) => {
                imagesToDelete.push(image.path)
            })
        }
        if (review.movies) {
            review.movies.forEach((movie) => {
                imagesToDelete.push(movie.coverImagePath)
            })
        }

        try {
            const deleteResponse = await fetch(`http://localhost:4000/api/reviews/${review._id}`, {
                method: 'DELETE',
            });
            const deleteJson = await deleteResponse.json();
            if (deleteResponse.ok) {
                console.log('Review Deleted', deleteJson);

                imagesToDelete.forEach(async (image) => {
                    await deleteImageFromFirebaseStorage(image)
                    console.log("image deleted from firebase")
                })
                console.log("all images removed from firebase")

                handleRefresh()
            }
        } catch (err) {
            console.log(err)
        }
    }

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
                            <div className='title'>
                                <Link to={`/recenzije/${review.slug}`}>{review.reviewTitle}</Link>
                                <div className='icons'>
                                    <Link to={`/recenzije/${review.slug}/edit`}>
                                        <EditIcon />
                                    </Link>
                                    <DeleteIcon onClick={() => handleDelete(review)}/>
                                </div>
                                
                            </div>
                            <div className='category'>{review.reviewType === 'single' ? 'Recenzija' : 'Kratki pregled'}</div>
                            <div className='rating'>
                                {review.reviewType === 'single' ? <Rating rating={review.movies[0].rating} /> : ''}
                            </div>
                            <div className='datePublished'>{formatDistanceToNow(new Date(review.createdAt), {addSuffix: true})}</div>
                            <div className='dateEdited'>{formatDistanceToNow(new Date(review.updatedAt), {addSuffix: true})}</div>
                        </TableItem>
                    ))}
                </TableContainer>
                <Pagination itemsPerPage={10} items={reviews} totalItems={totalItems} handlePageChange={handlePageChange}/>
            </PageSection>
        </PageContainer>
    )
}
