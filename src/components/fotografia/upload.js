import { Button } from 'primereact/button'
import React, { useRef, useState } from 'react'
import ServicioFotografia from '../../service/ServicioFotografia'
import './assets/styles/dataview.css';
import { Toast } from 'primereact/toast';

const Upload =  ({setImages, images}) =>{

    const [ file, setFile] = useState()
    const toast = useRef(null);
    const [ pathImage, setPathImage ] = useState("http://localhost:3005/default.png")
    const [loading1, setLoading1] = useState(false);

    const servicioFotografia = new ServicioFotografia();


    const sendImage = (e)=>{
        e.preventDefault()
        console.log('enviando...')
        servicioFotografia.sendFotos(file).then((result) =>{
            console.log('resultado es: ', result)
            alert('Registro exitoso')
            window.location.reload(true)
        })
    }

    //Previsualizacion de las imagenes cada vez que se cargen
    const onFileChange = (e)=> {
        if(e.target.files && e.target.files.lenght !== 0){
            console.log("mostrando")
            const file = e.target.files[0]
            if(file.type.includes("image")){
                //Reader para que lea el formato de la imagen
                const reader = new FileReader()
                reader.readAsDataURL(file)

                reader.onload = function load(){
                    setPathImage(reader.result)
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
                <input id="inputfile" accept="image/*" type="file" hidden accept="imagen" placeholder="file" onChange={onFileChange} onClick={onLoadingClick1}></input>
                <label htmlFor="inputfile" className="p-button p-mr-2 p-mb-2">
                        Seleccionar archivo
                    </label>
                <Button id="btn" className="p-mr-2 p-mr-2 p-mb-2" label="Subir" icon="pi pi-check" onClick={sendImage} loading={loading1}/>
                </div>
                    <div className="card">
                        <img style={{width:"25%"}} src={pathImage} alt="imagen de animal"/>
                    </div>
            </form>

        </div>

    )
}

export default Upload
