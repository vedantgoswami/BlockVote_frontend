import React from 'react';
import { useState } from 'react';

const ImageUpload = () => {
const [selectedFile, SetselectedFile] = useState("");
const [buffer,Setbuffer] = useState();
const imageUploaded=(e)=>{
    // console.log(e.target.files[0].name);
    SetselectedFile(e.target.files[0].name);
    const file = e.target.files[0];
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file);
    reader.onloadend=()=>{
        Setbuffer(Buffer(reader.result));
    }
} 
return (
    <div class="pht">
      <input type="file" id="file" accept="image/*" onChange={imageUploaded}/>
      <label for="file">
      <span class="material-icons">
add_photo_alternate
</span>&nbsp;
        Choose a Photo
      </label>
      <span>{selectedFile}</span>
    </div>
  )
}

export default ImageUpload
