import { useCallback, useEffect, useState } from 'react';
import { 
    Container,
    Button
 } from '@mui/material';
import { useDropzone } from 'react-dropzone';

import './css/ImgUpload.css';

const ImgUpload = () => {
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
        let id = 11;
        let data = new FormData()
        data.append('file', files[0])
        console.log(data.get('files'))
        let req = new Request(`http://localhost:5000/api/drink/new/${id}/img`, {
            method: 'post',
            body: data,
            mode: 'cors',
            credentials: 'include'
        });
        fetch(req)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            })

    }

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [])

    return(
        <Container>
            <div {...getRootProps({className: 'dropzone'})}>
                <input name="file" {...getInputProps()} />
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