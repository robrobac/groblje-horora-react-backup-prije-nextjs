import { useEffect, useState } from 'react'
import { SORT_OPTIONS } from '../helpers/sortOptions';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function useFetchReviewsWithParams(pageName, initialSort, initialOrder, initialPerPage) {
    console.log('----------')
    const navigate = useNavigate();

    const [refresh, setRefresh] = useState(false)
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(false)

    const [searchParams] = useSearchParams();
    console.log('searchParams: ', {
        paramsObject: searchParams,
        page: searchParams.get('page'),
        search: searchParams.get('search'),
        sort: searchParams.get('sort'),
        order: searchParams.get('order'),
        filter: searchParams.get('filter'),
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

    useEffect(() => {
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

        fetchReviews();
    }, [refresh, navigate, order, sort, search, page, perPage, filter]);

    useEffect(() => {
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
        
        navigate(url)
    }, [filter, initialOrder, initialSort, navigate, order, page, pageName, search, sort])

    const handlePageChange = (num) => {
        setPage(num)
    }

    const handleFilter = (value) => {
        setFilter(value)
        setPage(1)
    }

    const handleSearch = (value) => {
        setSearch(value)
        setPage(1)
    }

    const handleSortAndOrder = (sortVal, orderVal) => {
        if (sort === sortVal) {
            if (orderVal === 'desc') {
                setOrder('asc')
                setPage(1)
            }
            if (orderVal === 'asc') {
                setOrder('desc')
                setPage(1)
            }
        } else {
            setSort(sortVal)

            if (sortVal === SORT_OPTIONS.TITLE) {
                setOrder('asc')
                setPage(1)
                return
            }
            if (sortVal === SORT_OPTIONS.CATEGORY) {
                setOrder('asc')
                setPage(1)
                return
            }
            setOrder('desc')
            setPage(1)
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
