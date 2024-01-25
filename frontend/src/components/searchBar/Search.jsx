import React from 'react'
import { FilterControl, SearchBar, SearchComp, SearchContainer, SearchControls, SearchIcon, SortControl } from './Search.styled';
import { ReactComponent as SearchIconSVG } from '../../images/search-icon.svg';
import { SORT_OPTIONS } from '../../helpers/sortOptions';
import { FilterButton, SortButton } from '../buttons/Buttons.styled';
import useCountReviews from '../../hooks/useCountReviews';
import Filter from './Filter';
import Sort from './Sort';

export default function Search({ search, handleSearch, sort, order, handleSortAndOrder, handleFilter, filter, controls }) {

    const {
        count
    } = useCountReviews()

    return (
        <SearchComp>
        <SearchContainer>
            <SearchIcon htmlFor='adminSearch'>
                <SearchIconSVG />
            </SearchIcon>
            <SearchBar id='adminSearch' type='search' placeholder='Search' value={search} onChange={(e) => handleSearch(e.target.value || '')}/>
        </SearchContainer>
        {controls ? (
            <SearchControls>
                <FilterControl>
                    <Filter clickFunction={handleFilter} title='Sve' label='' filter={filter} search={search} count={count} counting={count?.numberOfReviews}/>
                    <Filter clickFunction={handleFilter} title='Kratki Pregledi' label='quad' filter={filter} search={search} count={count} counting={count?.quadReviews}/>
                    <Filter clickFunction={handleFilter} title='Recenzije' label='single' filter={filter} search={search} count={count} counting={count?.singleReviews}/>
                </FilterControl>
                <SortControl>
                    <Sort clickFunction={handleSortAndOrder} title='Naslov' sortOption={SORT_OPTIONS.TITLE} sort={sort} order={order} search={search}/>
                    <Sort clickFunction={handleSortAndOrder} title='Ocjena' sortOption={SORT_OPTIONS.RATING} sort={sort} order={order} search={search}/>
                    <Sort clickFunction={handleSortAndOrder} title='Datum' sortOption={SORT_OPTIONS.CREATED} sort={sort} order={order} search={search}/>
                </SortControl>
            </SearchControls>
        ) : ''}
        </SearchComp>
    )
}
