import React from 'react'
import { useEffect, useRef } from 'react'
import { FilterControl, SearchBar, SearchComp, SearchContainer, SearchControls, SearchIcon, SortControl } from './Search.styled';
import { ReactComponent as SearchIconSVG } from '../../images/search-icon.svg';
import { SORT_OPTIONS } from '../../helpers/sortOptions';

import useCountReviews from '../../hooks/useCountReviews';
import Filter from './Filter';
import Sort from './Sort';

export default function Search({ search, handleSearch, sort, order, handleSortAndOrder, handleFilter, filter, controls }) {

    const {
        count
    } = useCountReviews()

    const inputRef = useRef(null)

    //  event listeners for closing the virtual keyboard on touch outside the input field
    useEffect(() => {
        // Attach scroll event listener when component mounts
        window.addEventListener('touchstart', handleOutsideClick);
        
        // Detach scroll event listener when component unmounts
        return () => {
            window.removeEventListener('touchstart', handleOutsideClick);
        };
    }, []);
        
    //  function that handles tapping outside the input value in order to close virtual keyboard
    const handleOutsideClick = (e) => {
        console.log('Tap outside')
        // Blur input if the click is outside of the input element
        if (inputRef.current && !inputRef.current.contains(e.target)) {
            inputRef.current.blur();
        }
    };
        
    //  close virtual keyboard on enter
    const onEnter = (e) => {
        console.log('On Enter')
        if (e.key === "Enter") {
            e.target.blur();
        }
    };

    return (
        <SearchComp>
        <SearchContainer>
            <SearchIcon htmlFor='adminSearch'>
                <SearchIconSVG />
            </SearchIcon>
            <SearchBar ref={inputRef} onKeyUp={onEnter} id='adminSearch' type='search' placeholder='Search' value={search} onChange={(e) => handleSearch(e.target.value || '')}/>
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
