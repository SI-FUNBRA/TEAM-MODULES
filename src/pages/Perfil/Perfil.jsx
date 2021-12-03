import { Toast } from 'primereact/toast';
import React, { useState, useEffect, useRef } from 'react'
import { ServicioUsu } from '../../service/ServicioUsu';
import DatosContacto from './modulosPerfil/DatosContacto';
import DatosBasicos from './modulosPerfil/DatosBasicos'
import Contraseña from './modulosPerfil/Contraseña';

const Perfil = () => {

    const toast = useRef(null);

    const [perfil, setPerfil] = useState({})
    const [keyComponent, setKeyComponent] = useState(1)

    useEffect(() => {
        const servicioUsuario = new ServicioUsu()

        servicioUsuario.getUsertopbar().then(res=>{
            servicioUsuario.getUsuarioPorId(res.data.id).then(response=>{
                setPerfil(response.data)
                setKeyComponent(keyComponent+1)
                console.log(response)
            })
        })


    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const serviUsu = new ServicioUsu();

    const guardarData = (data) =>{
        serviUsu.updateUsuario(perfil.idUsuario, data).then(res=>{
            if(res.status === 201){
                toast.current.show({ severity: 'success', summary: 'Todo bien', detail: res.data.success, life: 3000 });
                toast.current.show({ severity: 'info', summary: 'Cuidado', detail:"El cambio de información se verá afectado en un momento.", life: 3000 });
            }else{
                toast.current.show({ severity: 'error', summary: 'Error', detail: res.data.error, life: 3000 });
            }
        })
    }

    return (
        <div className="grid justify-conten-center">
            <div className="col-12 lg:col-6 xl:col-4">
                <div className="card mb-0">
                    Datos De Usuario
                    <DatosBasicos data={perfil} key={keyComponent} guardarData={guardarData}/>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-4">
                <div className="card mb-0">
                    Datos De Contacto
                    <DatosContacto data={perfil} key={keyComponent} guardarData={guardarData}/>
                </div>
            </div>
            <div className="col">
                <div className="card">
                    <div className="col">
                        Gestion Contraseña
                        <Contraseña data={perfil} key={keyComponent} toast={toast}/>
                    </div>
                </div>
            </div>
            <Toast ref={toast} position="bottom-right"/>

        </div>
    )
}

export default Perfil
