import { useEffect } from 'react';
import { 
    Container
 } from '@mui/material';
import { useDropzone } from 'react-dropzone';

import './css/ImgUpload.css';

const ImgUpload = ({imgData, setImgData, isActive}) => {
    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/gif': ['.gif'],
            'image/jpeg': ['.jpeg']
        },
        onDrop: acceptedFiles => {
            setImgData(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })))
        }
    })

    const thumbs = imgData.map(file => (
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

    useEffect(() => {
        return () => imgData.forEach(file => URL.revokeObjectURL(file.preview));
    }, [])

    return(
        <Container className="post-review-image-container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input name="file" {...getInputProps()} disabled={!isActive} />
                <p>drag n drop here</p>
            </div>
            <aside className="thumbs-container">
                <ul>{thumbs}</ul>
            </aside>
            {/* <Button onClick={uploadImg}>Upload</Button> */}
        </Container>
    );
}

export default ImgUpload;