import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';

import ServicioDocumento from '../../service/ServicioDocumento';

const Upload =  ({setDocumentos, documentos}) =>{

    const [ file, setFile ] = useState()
    const [ pathDoc, setPathDoc ] = useState("http://localhost:3005/FORMULARIO_DE_ADOPCIÓN_FUNBRA.docx")
    const [loading1, setLoading1] = useState(false);

    const servicioDocumento = new ServicioDocumento();

    const sendDoc = (e)=>{
        e.preventDefault()
        console.log('enviando...')
        servicioDocumento.sendDocumentos(file).then((result) =>{
            console.log('resultado es: ', result)
            alert('Registro exitoso')
            window.location.reload(true)
        })
    }

    //Previsualizacion del documento cada vez que se cargen
    const onFileChange = (e)=> {
        if(e.target.files && e.target.files.lenght !== 0){
            console.log("mostrando")
            const file = e.target.files[0]
            if(file.type.includes('application')){
                //Reader para que lea el formato del documento
                console.log('mostrando')
                const reader = new FileReader()
                reader.readAsDataURL(file)

                reader.onload = function load(){
                    setPathDoc(reader.result)
                }
                setFile(file)
            }
            else{
                console.log("Ocurrió un error")
            }
        }
    }

    const onLoadingClick1 = () => {
        setLoading1(true);

        setTimeout(() => {
            setLoading1(false);
        }, 10000);
    }

    return(
        <div>
            <form encType="multipart/form-data">

                <div className="card">
                <input id="inputfile" type="file" hidden placeholder="file" onChange={onFileChange} onClick={onLoadingClick1}></input>
                <label htmlFor="inputfile" className="p-button p-mr-2 p-mb-2">
                        Seleccionar archivo
                    </label>
                <Button id="btn" className="p-mr-2 p-mr-2 p-mb-2" label="Subir" icon="pi pi-check" onClick={sendDoc} loading={loading1}/>
                </div>
                    <div className="card">
                    <div className="p-text-nowrap p-text-justify" style={{width: '10rem'}}>
                        <b>Documento seleccionado: </b><span>{pathDoc}</span>
                    </div>
                    </div>
            </form>

        </div>

    )
}

export default Upload
