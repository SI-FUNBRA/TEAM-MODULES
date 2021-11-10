
import React, {useState} from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { Route, useHistory } from 'react-router-dom';
import PersonalInfo from './componentsRegister/PersonalInfo';

const Pruebar = () => {

    const history = new useHistory()

    const cambiarPanel = (panel) =>{
        history.push(`/log/register2/${panel}`)
    }

    const [data, setData] = useState({
        nombreUsuario:'',
        apellidoUsuario:'',
        correoUsuario:'',
        telefonoFijo:'',
        telefonoCelular:'',
        fechaNacimientoUsuario:'',
        idTipoDocumento_FK:'',
        numeroDocumento:'',
        fechaExpedicionDoc:'',
        LugarExpedicionDoc:'',
        idCiudad_FK:'',

        username:'',
        pass:''
    })

    const wizardItems = [
        { label: 'Informacion Basica',icon: 'pi pi-book',command:()=>cambiarPanel(1) },
        { label: 'Identificación',icon: 'pi pi pi-id-card',command:()=>cambiarPanel(2) },
        { label: 'Datos Contacto',icon: 'pi pi-comments',command:()=>cambiarPanel(3) },
        { label: 'Cuenta', icon: 'pi pi-home',command:()=>cambiarPanel(4) }
    ];

    return (
        <div className="flex align-items-center justify-content-center" style={{width: "100%", height: "100%", position: 'fixed'}}>
                <div className="flex align-items-center justify-content-center">

                    <div className="card card-w-title">
                        <h5>Registra Tu Información Personal</h5>
                        <TabMenu model={wizardItems}  />

                        <Route component={PersonalInfo} path='/log/register2/1'/>

                        <Route path='/log/register2/2'>adios</Route>
                        <Route path='/log/register2/3'>ola denuevo</Route>
                        <Route path='/log/register2/4'>adios losiemto</Route>
                    </div>
                </div>

        </div>
    );
}


export default Pruebar
