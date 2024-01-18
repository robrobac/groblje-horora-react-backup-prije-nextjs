import React from 'react'
import { DraftsContainer } from './DraftReviews.styled'
import {ReactComponent as DeleteIcon} from '../../../images/deleteicon.svg'

export default function DraftReviews() {
    return (
        <DraftsContainer>
            <h3>Drafts <span>(Nisam siguran koliko dugo ostaju spremljeni, to moram istraziti)</span></h3>
            <div className="drafts">
                <div className="draft">
                    <p>Draft1</p>
                    <p>Kratki Pregled</p>
                    <p>18.02.1994</p>
                    <div className="deleteIcon">
                        <DeleteIcon />
                    </div>
                    
                </div>
                <div className="draft">
                    <p>Draft1</p>
                    <p>Kratki Pregled</p>
                    <p>18.02.1994</p>
                    <div className="deleteIcon">
                        <DeleteIcon />
                    </div>
                </div>
                <div className="draft">
                    <p>Draft1</p>
                    <p>Kratki Pregled</p>
                    <p>18.02.1994</p>
                    <div className="deleteIcon">
                        <DeleteIcon />
                    </div>
                </div>
            </div>
        </DraftsContainer>
    )
}
