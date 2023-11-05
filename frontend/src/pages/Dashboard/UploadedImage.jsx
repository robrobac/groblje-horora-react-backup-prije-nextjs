import React, { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

export default function UploadedImage({image, index, handleDeleteUploaded}) {
    const [copied, setCopied] = useState(false)
    console.log(copied)

    const handleCopy = () => {
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, '900')
    }


    return (
        <CopyToClipboard text={image.url} onCopy={handleCopy}>
            <div className='uploadedImage' onClick={() => console.log('copy')}>
                <span className='deleteButton' onClick={(e) => handleDeleteUploaded(e, image, index)}>X</span>
                {copied ? <span className='copySuccess'>COPIED</span> : ''}
                <img key={index} src={image.url} alt='UploadedImage'/>
                <p>Copy URL</p>
            </div>
        </CopyToClipboard>
    )
}
