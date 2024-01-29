import React, { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom';

export default function ScrollAfterRouteChange() {
    const { pathname } = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const pageParam = searchParams.get('page');

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, [pathname, pageParam]);


    return null;
}
