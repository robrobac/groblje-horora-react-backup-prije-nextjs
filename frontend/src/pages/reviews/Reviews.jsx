import React, { useContext } from 'react'
import useFetchReviewsWithParams from '../../hooks/useFetchReviewsWithParams'
import { SORT_OPTIONS } from '../../helpers/sortOptions'
import Search from '../../components/searchBar/Search'
import { ButtonsWrap, ReviewsContainer, ReviewsTitleContainer } from './Reviews.styled'
import PostsFlex from '../../components/postsFlex/PostsFlex'
import HelmetSettings from '../../components/HelmetSettings'
import Pagination from '../../components/pagination/Pagination'
import { Link } from 'react-router-dom'
import { SmallButton } from '../../components/buttons/Buttons.styled'
import { AuthContext } from '../../App'

// Styled Components


export default function Reviews() {
    const {userData, firebaseUser} = useContext(AuthContext)

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
        handleRefresh,
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
                        Na ovoj stranici pronađite sve recenzije i kratke preglede od 2007. godine do danas. Koristeći pretraživač filtrirajte, sortirajte, pretražite i pronađite željeni horor film. Ne zamjerite na svim recenzijama za filmove koje su napisane u ranoj fazi bloga, tamo od 2007. do 2010., tada sam bio klinjo od svega 14-15 godina.
                    </p>
                </ReviewsTitleContainer>
                {userData?.role === 'admin' && firebaseUser ? (
                    <ButtonsWrap>
                        <Link to={'/dashboard/nova-recenzija'}>
                            <SmallButton>Nova Recenzija</SmallButton>
                        </Link>
                        <Link to={'/dashboard/novi-kratki-pregled'}>
                            <SmallButton>Novi Kratki Pregled</SmallButton>
                        </Link>
                    </ButtonsWrap>
                ) : ''}
                <Search controls={true} handleSearch={handleSearch} search={search} sort={sort} order={order} handleSortAndOrder={handleSortAndOrder} handleFilter={handleFilter} filter={filter}/>
                
                <PostsFlex posts={reviews} loading={loading} handleRefresh={handleRefresh}/>
                <Pagination currentPage={page} totalPages={totalPages} handlePageChange={handlePageChange}/>
            </ReviewsContainer>
        </>
    )
}
