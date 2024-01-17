import React from 'react'
import useFetchReviewsWithParams from '../../hooks/useFetchReviewsWithParams'
import { SORT_OPTIONS } from '../../helpers/sortOptions'
import Search from '../../components/searchBar/Search'
import { ReviewsContainer, ReviewsTitleContainer } from './Reviews.styled'
import Pagination from '../../components/pagination/Pagination'
import PostsFlex from '../../components/postsFlex/PostsFlex'
import Loading from '../../components/loading/Loading'
import HelmetSettings from '../../components/HelmetSettings'
import LoadingButton from '../../components/buttons/LoadingButton/LoadingButton'

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
                <ReviewsTitleContainer>
                    <h1>Recenzije</h1>
                    <p>
                        Na ovoj stranici pronađite sve recenzije i kratke preglede od 2007. godine do danas. Koristeći pretraživač filtrirajte, sortirajte, pretražite i pronađite željeni horor film.
                    </p>
                </ReviewsTitleContainer>
                <Search controls={true} handleSearch={handleSearch} search={search} sort={sort} order={order} handleSortAndOrder={handleSortAndOrder} handleFilter={handleFilter} filter={filter}/>
                
                <PostsFlex posts={reviews} loading={loading}/>
                {!loading ? <Pagination itemsPerPage={30} items={reviews} totalItems={totalItems} handlePageChange={handlePageChange}/> : ''}  
            </ReviewsContainer>
        </>
    )
}
