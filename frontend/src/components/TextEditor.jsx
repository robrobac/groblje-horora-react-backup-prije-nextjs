import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function TextEditor() {
    const [value, setValue] = useState('');
    console.log(value)
    var toolbarOptions = [['bold', 'italic'], ['link', 'image']];
    const module = {
        toolbar: toolbarOptions,
    }
    
    return <ReactQuill theme="snow" value={value} onChange={setValue} modules={module}/>;
}
