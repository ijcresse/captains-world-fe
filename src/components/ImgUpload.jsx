import { useCallback, useEffect, useState } from 'react';
import { 
    Container,
    Button
 } from '@mui/material';
import { useDropzone } from 'react-dropzone';

import './css/ImgUpload.css';

const ImgUpload = () => {
    // const onDrop = useCallback(acceptedFiles => {
    //     console.log(acceptedFiles[0]);
    //     // console.log(fileRejections); //want to know about failures. notify with snackbar eventually
    //     setImageUrl(acceptedFiles[0].path); //ensure this is the url!
    //     const acceptedFile = acceptedFiles[0] //only accepts one file at a time anyway
    //     const reader = new FileReader()
    //     reader.onabort = () => console.warn('File reading was aborted')
    //     reader.onerror = () => console.error('File reading failed!')
    //     reader.onload = () => {
    //         const binaryStr = reader.result
    //         console.log(binaryStr)
    //     }
    //     reader.readAsArrayBuffer(acceptedFile)
    // }, [])

    // const { getRootProps, getInputProps, isDragActive } = useDropzone({
    //     onDrop, 
    //     maxFiles:1, 
    //     accept: {
    //         'image/png': ['.png'],
    //         'image/gif': ['.gif'],
    //         'image/jpeg': ['.jpeg'],
    //         'image/webp': ['.webp']
    //     }});

    // const postImage = () => {
    //     console.log('post image', imageData)
    //     // let req = new Request('http://localhost:5000/api/drink/post', {
    //     //     method: 'post',
    //     //     body : JSON.stringify(),
    //     //     headers: 'image/' + image_type
    //     // })
    // }
    const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/gif': ['.gif'],
            'image/jpeg': ['.jpeg'],
            'image/webp': ['.webp']
        },
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })))
        }
    })

    const thumbs = files.map(file => (
        <div className="thumb" key={file.name}>
            {file.name} - {file.size} bytes
            <div className="thumb-inner">
                <img
                    src={file.preview}
                    className="img"
                    //revoke data uri after image is loaded
                    onLoad={() => { URL.revokeObjectURL(file.preview)}}
                />
            </div>
        </div>
    ))

    const uploadImg = () => {
        console.log(files)
    }

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [])

    return(
        <Container>
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p>drag n drop here</p>
            </div>
            <aside className="thumbs-container">
                <ul>{thumbs}</ul>
            </aside>
            {/* <div className="post-review-image-container" {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps} />
                {
                    isDragActive ?
                        <p>Upload image</p> :
                        <p>Drag and drop or click to select files</p>
                }
            </div> */}
            <Button onClick={uploadImg}>Upload</Button>
        </Container>
    );
}

export default ImgUpload;