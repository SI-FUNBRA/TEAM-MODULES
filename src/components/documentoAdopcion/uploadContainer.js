import React from 'react'
import ListDocumentos from './listDocumentos'
import Upload from './upload'


const UploadContainer =  () =>{
    return(
       <div>
        <div>
        <Upload/>
        </div>
        <div>
        <ListDocumentos/>
        </div>
       </div>
    )
}

export default UploadContainer
