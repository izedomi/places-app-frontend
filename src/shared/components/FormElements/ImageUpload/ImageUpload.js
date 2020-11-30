import React, {useRef, useState, useEffect} from 'react';
import Button from '../Button/Button';

import './ImageUpload.css'


const ImageUpload = props => {

    const imageRef = useRef();

    let [file, setFile] = useState();
    let [previewUrl, setPreviewUrl] = useState();
    let [isValid, setIsValid] = useState();


    useEffect(() => {

        if(!file) 
            return;

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        };
        fileReader.readAsDataURL(file)


    }, [file])

    const pickImageHandler = () => {
        imageRef.current.click();
    }

    const selectedImageHandler = (event) => {
        
        let selectedFile;
        let isFileValid = isValid;
        if(event.target.files && event.target.files.length === 1){
          
            selectedFile = event.target.files[0];
            setFile(selectedFile)
            setIsValid(true);
            isFileValid = true;
            //console.log(selectedFile)
        }
        else{  
            setIsValid(false);
            isFileValid = false;
        }

        props.onInput(props.id, selectedFile, isFileValid)
    }


    return (

        <div className='form-control'>
            <input
            id={props.id}
            type='file'
            ref={imageRef}
            style={{display: 'none'}}
            accept='.jpg,.jpeg,.png'
            onChange={selectedImageHandler} />

            <div className={`image-upload ${props.center && 'center'}`}>
                {previewUrl && <div className="image-upload__preview">
                    <img src={previewUrl} alt="upload-preview" />
                </div>}
                <Button type='button' onClick={pickImageHandler}>PICK IMAGE</Button>
            </div>

            {!isValid && <p>{props.errorText}</p>}
         
        </div>
    )
}


export default ImageUpload;