import React from 'react'
import { FilterControl, SearchBar, SearchComp, SearchContainer, SearchControls, SearchIcon, SortControl } from './Search.styled';
import { ReactComponent as SearchIconSVG } from '../../images/search-icon.svg';
import { SORT_OPTIONS } from '../../helpers/sortOptions';
import { FilterButton, SortButton } from '../buttons/Buttons.styled';

export default function Search({ search, handleSearch, sort, order, handleSortAndOrder, handleFilter, filter, controls }) {
    return (
        <SearchComp>
        <SearchContainer>
            <SearchIcon htmlFor='adminSearch'>
                <SearchIconSVG />
                </SearchIcon>
            <SearchBar id='adminSearch' type='search' placeholder='Search' value={search} onChange={(e) => handleSearch(e.target.value)}/>
        </SearchContainer>
        {controls ? (
            <SearchControls>
                <FilterControl>
                    <FilterButton onClick={() => handleFilter('')} className={filter === '' && !search ? 'active' : ''} style={{pointerEvents: search ? 'none' : 'auto', opacity: search ? .25 : 1}}>
                        Sve
                    </FilterButton>
                    <FilterButton onClick={() => handleFilter('quad')} className={filter === 'quad' && !search ? 'active' : ''} style={{pointerEvents: search ? 'none' : 'auto', opacity: search ? .25 : 1}}>
                        Kratki Pregledi
                    </FilterButton>
                    <FilterButton onClick={() => handleFilter('single')} className={filter === 'single' && !search ? 'active' : ''} style={{pointerEvents: search ? 'none' : 'auto', opacity: search ? .25 : 1}}>
                        Recenzije
                    </FilterButton>
                </FilterControl>
                <SortControl>
                    <SortButton onClick={() => handleSortAndOrder(SORT_OPTIONS.TITLE, order)} className={sort === SORT_OPTIONS.TITLE && !search ? 'active' : ''} style={{pointerEvents: search ? 'none' : 'auto', opacity: search ? .25 : 1}}>
                        Naslov <span>{sort === SORT_OPTIONS.TITLE && !search ? (order === 'desc' ? '🔽' : '🔼') : ''}</span>
                    </SortButton>
                    <SortButton onClick={() => handleSortAndOrder(SORT_OPTIONS.RATING, order)} className={sort === SORT_OPTIONS.RATING && !search ? 'active' : ''} style={{pointerEvents: search ? 'none' : 'auto', opacity: search ? .25 : 1}}>
                        Ocjena <span>{sort === SORT_OPTIONS.RATING && !search ? (order === 'desc' ? '🔽' : '🔼') : ''}</span>
                    </SortButton>
                    <SortButton onClick={() => handleSortAndOrder(SORT_OPTIONS.CREATED, order)} className={sort === SORT_OPTIONS.CREATED && !search ? 'active' : ''} style={{pointerEvents: search ? 'none' : 'auto', opacity: search ? .25 : 1}}>
                        Datum <span>{sort === SORT_OPTIONS.CREATED && !search ? (order === 'desc' ? '🔽' : '🔼') : ''}</span>
                    </SortButton>
                </SortControl>
            </SearchControls>
        ) : ''}
        </SearchComp>
    )
}
