import { useEffect, useState } from 'react'
import { SORT_OPTIONS } from '../helpers/sortOptions';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function useFetchReviewsWithParams(pageName, initialSort, initialOrder, initialPerPage) {
    console.log('----------')
    const navigate = useNavigate();

    const [refresh, setRefresh] = useState(false)
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams();
    console.log('searchParams: ', {
        paramsObject: searchParams,
        page: searchParams.get('page') || '',
        search: searchParams.get('search') || '',
        sort: searchParams.get('sort') || '',
        order: searchParams.get('order') || '',
        filter: searchParams.get('filter') || '',
    })

    // Page States and Params
    const urlPage = searchParams.get('page');
    const [page, setPage] = useState(urlPage ? parseInt(urlPage) : 1);
    console.log('page: ', page)

    // Search State and Params
    const urlSearch = searchParams.get('search')
    const [search, setSearch] = useState(urlSearch ? urlSearch : '')
    console.log('search: ', search)

    const urlSort = searchParams.get('sort');
    const [sort, setSort] = useState(urlSort ? urlSort : initialSort)
    console.log('sort: ', sort)

    const urlOrder = searchParams.get('order');
    const [order, setOrder] = useState(urlOrder ? urlOrder : initialOrder)
    console.log('order: ', order)

    const urlFilter = searchParams.get('filter')
    const [filter, setFilter] = useState(urlFilter ? urlFilter : '')
    console.log('filter: ', filter)

    // eslint-disable-next-line no-unused-vars
    const [perPage, setPerPage] = useState(initialPerPage);
    const [totalItems, setTotalItems] = useState()
    const [totalPages, setTotalPages] = useState([])

    const fetchReviews = async () => {
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:4000/api/reviews?search=${search}&sort=${sort}&order=${order}&page=${page}&perPage=${perPage}&filter=${filter}`);
            const json = await response.json();

            if (response.ok) {
                setReviews(json.reviews);
                const pagesArray = Array.from({ length: json.totalPages }, (_, index) => index + 1);
                setTotalPages(pagesArray);
                setTotalItems(json.totalItems)
            }

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    };

    const generateURL = () => {
        let url = `/${pageName}?page=${page}`;

        if (search) {
            url += `&search=${search}`
        }
        if (filter !== '') {
            url += `&filter=${filter}`
        }
        if (!(sort === initialSort && order === initialOrder && filter === '')) {
            url += `&sort=${sort}&order=${order}`
        }

        return url
    }

    useEffect(() => {
        fetchReviews();
    }, [page, filter, sort, order, search]);


    useEffect(() => {
        const pageNumber = parseInt(searchParams.get('page'), 10) || 1;
        const filterValue = searchParams.get('filter') || '';
        const sortValue = searchParams.get('sort') || '';
        const orderValue = searchParams.get('order') || '';
        const searchValue = searchParams.get('search') || '';
        setPage(pageNumber);
        setFilter(filterValue);
        setSort(sortValue)
        setOrder(orderValue)
        setSearch(searchValue)
        
    }, [searchParams.get('page'), searchParams.get('filter'), searchParams.get('sort'), searchParams.get('order'), searchParams.get('search')])


    const handlePageChange = (num) => {
        setPage(num)

        // Create a new URLSearchParams object before modifying it
        const newSearchParams = new URLSearchParams(searchParams);
        // Update the 'page' parameter
        newSearchParams.set('page', num);
        newSearchParams.delete('search');
        // Use setSearchParams to apply the changes
        setSearchParams(newSearchParams);
    }

    const handleFilter = (value) => {
        setFilter(value)
        setPage(1)
        console.log('aaaaaaaaaaaaaaaaaaaaaaa', value)

        // Create a new URLSearchParams object before modifying it
        const newSearchParams = new URLSearchParams(searchParams);

        if (value) {
            
            // Update the 'page' parameter
            newSearchParams.set('filter', value);
            newSearchParams.set('page', 1);
            newSearchParams.delete('search');
            // Use setSearchParams to apply the changes
            setSearchParams(newSearchParams);
        } else {
            // Update the 'page' parameter
            newSearchParams.delete('filter');
            newSearchParams.set('page', 1);
            newSearchParams.delete('search');
            // Use setSearchParams to apply the changes
            setSearchParams(newSearchParams);
        }

        
    }

    const handleSearch = (value) => {
        setSearch(value)
        setPage(1)

        // Create a new URLSearchParams object before modifying it
        const newSearchParams = new URLSearchParams(searchParams);

        if (value) {
            // Update the 'page' parameter
            newSearchParams.set('search', value);
            newSearchParams.set('page', 1);
        }
        if (!value) {
            // Update the 'page' parameter
            newSearchParams.delete('search');
            newSearchParams.set('page', 1);
        }
        // Use setSearchParams to apply the changes
        setSearchParams(newSearchParams);

    }

    const handleSortAndOrder = (sortVal, orderVal) => {
        if (sort === sortVal) {
            if (orderVal === 'desc') {
                setOrder('asc')
                setPage(1)

                // Create a new URLSearchParams object before modifying it
                const newSearchParams = new URLSearchParams(searchParams);
                // Update the 'page' parameter
                newSearchParams.set('order', 'asc');
                newSearchParams.set('page', 1);
                newSearchParams.delete('search');
                // Use setSearchParams to apply the changes
                setSearchParams(newSearchParams);
            }
            if (orderVal === 'asc') {
                setOrder('desc')
                setPage(1)

                // Create a new URLSearchParams object before modifying it
                const newSearchParams = new URLSearchParams(searchParams);
                // Update the 'page' parameter
                newSearchParams.set('order', 'desc');
                newSearchParams.set('page', 1);
                newSearchParams.delete('search');
                // Use setSearchParams to apply the changes
                setSearchParams(newSearchParams);
            }
        } else {
            setSort(sortVal)

            // Create a new URLSearchParams object before modifying it
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set('sort', sortVal);
            newSearchParams.delete('search');

            if (sortVal === SORT_OPTIONS.TITLE) {
                setOrder('asc')
                setPage(1)

                // Update the 'page' parameter
                newSearchParams.set('order', 'asc');
                newSearchParams.set('page', 1);
                // Use setSearchParams to apply the changes
                setSearchParams(newSearchParams);
                return
            }
            if (sortVal === SORT_OPTIONS.CATEGORY) {
                setOrder('asc')
                setPage(1)

                // Update the 'page' parameter
                newSearchParams.set('order', 'asc');
                newSearchParams.set('page', 1);
                // Use setSearchParams to apply the changes
                setSearchParams(newSearchParams);
                return
            }
            setOrder('desc')
            setPage(1)

            // Update the 'page' parameter
            newSearchParams.set('order', 'desc');
            newSearchParams.set('page', 1);
            // Use setSearchParams to apply the changes
            setSearchParams(newSearchParams);
        }

    }

    const handleRefresh = () => {
        setRefresh(!refresh)
    }

  return {
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
  }
}
