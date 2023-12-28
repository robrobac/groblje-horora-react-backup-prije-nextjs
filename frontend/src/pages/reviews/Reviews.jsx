import React from 'react'
import useFetchReviewsWithParams from '../../hooks/useFetchReviewsWithParams'
import { SORT_OPTIONS } from '../../helpers/sortOptions'
import Search from '../../components/searchBar/Search'
import { ReviewsContainer } from './Reviews.styled'
import Pagination from '../../components/pagination/Pagination'
import PostsFlex from '../../components/postsFlex/PostsFlex'
import Loading from '../../components/loading/Loading'
import HelmetSettings from '../../components/HelmetSettings'

// Styled Components


export default function Reviews() {
    const {
        handleSearch,
        search,
        sort,
        order,
        handleSortAndOrder,
        handleFilter,
        filter,
        reviews,
        totalPages,
        handlePageChange,
        page,
        totalItems,
        loading
    } = useFetchReviewsWithParams('recenzije', SORT_OPTIONS.CREATED, 'desc', 30)

    
    
    return (
        <>
            <HelmetSettings
                title={`Recenzije - Groblje Horora`}
                description={`
                    Popis svih recenzija i kratkih pregleda uz mogucnost pretrazivanja, sortiranja i filtriranja sadržaja
                `}
                url={`https://www.groblje-horora.com/recenzije`}
                image={`%PUBLIC_URL%/images/groblje-horora-og-image.webp`}
            />
            <ReviewsContainer>
                <Search controls={true} handleSearch={handleSearch} search={search} sort={sort} order={order} handleSortAndOrder={handleSortAndOrder} handleFilter={handleFilter} filter={filter}/>
                {loading ? <Loading /> : ''}
                <PostsFlex posts={reviews}/>
                <Pagination itemsPerPage={30} items={reviews} totalItems={totalItems} handlePageChange={handlePageChange}/>   
            </ReviewsContainer>
        </>
    )
}
