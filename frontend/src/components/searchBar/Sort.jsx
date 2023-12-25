import React from 'react'
import { SortButton } from '../buttons/Buttons.styled'
import {ReactComponent as UpIcon} from '../../images/up.svg'
import {ReactComponent as DownIcon} from '../../images/down.svg'

export default function Sort({clickFunction, title, sortOption, sort, order, search }) {
    return (
        <SortButton
            onClick={() => clickFunction(sortOption, order)}
            className={sort === sortOption && !search ? 'active' : ''}
            style={{pointerEvents: search ? 'none' : 'auto', opacity: search ? .25 : 1}}>
                {title}
                {sort === sortOption && !search ? (order === 'desc' ? <DownIcon /> : <UpIcon />) : ''}
        </SortButton>
    )
}
