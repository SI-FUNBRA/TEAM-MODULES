import React from 'react'
import ListFotos from './listFotos'
import Upload from './upload'


const UploadContainer =  () =>{
    return(
       <div>
        <div>
        <Upload/>
        </div>
        <div>
            <ListFotos/>
        </div>
       </div>
    )
}

export default UploadContainer
