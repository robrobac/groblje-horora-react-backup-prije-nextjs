import React from 'react'
import { FilterButton } from '../buttons/Buttons.styled'

export default function Filter({clickFunction, title, label, filter, search, count, counting}) {
    return (
        <FilterButton
            onClick={() => clickFunction(label)}
            className={filter === label && !search ? 'active' : ''}
            style={{pointerEvents: search ? 'none' : 'auto', opacity: search ? .25 : 1}}>
                {title} <span>{counting}</span>
        </FilterButton>
    )
}
