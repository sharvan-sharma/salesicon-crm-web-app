import React, { useState } from "react";
//import '../../../styles/main.css'
import Alert from '@material-ui/lab/Alert'
import Dropzone from "react-dropzone";

const fileType = {
  image:{
    type:['jpg','png','bmp'],
    typeErrorMessage:'Only .jpg, .png and .bmp files are acceptable',
    lengthErrorMessage:'select a file which is (.jpg, .png or .bmp) and size less than'
  },
  xls:{
    type:['xls'],
    typeErrorMessage:'Only .xls files are acceptable',
    lengthErrorMessage:'select a file which is xls and size less than'
  }
}

export default function App(props) {

  const handleDrop = acceptedFiles =>{
    if(acceptedFiles.length === 1){
      if(fileType[props.fileType].type.includes(acceptedFiles[0].name.split('.').pop())){
        props.setFile(acceptedFiles[0],{exist:false})
      }else{
        props.setFile(null,{exist:true,msg:fileType[props.fileType].typeErrorMessage})
      }
    }else{
      props.setFile(null,{exist:true,msg:fileType[props.fileType].lengthErrorMessage+` ${props.maxSize/1000}kb`})
    }
  }

  return (
    <div className="App">
      <Dropzone onDrop={handleDrop} 
        maxSize={props.maxSize}
        multiple={false}>
        {({ 
          getRootProps, 
          getInputProps, 
          isDragActive,
          isDragAccept,
          isDragReject
         }) => {
          
           return (
                    <div {...getRootProps({ className: ` ${(isDragAccept)?'accept':''} ${(isDragReject)?'reject':''} ${(isDragActive)?'active':''} ${(isDragActive || isDragReject || isDragAccept)?'':'dropzone'}` })}>
                      <input {...getInputProps()} />
                      <p>Drag'n'drop or click to select  your {props.fileType} file</p>
                    </div>
                  )
        }
        }
      </Dropzone>
      <div>
      </div>
    </div>
  );
}
