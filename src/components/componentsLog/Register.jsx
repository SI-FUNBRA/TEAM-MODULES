
import React, {useEffect, useState} from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { Dialog } from 'primereact/dialog';
import { Route, useHistory } from 'react-router-dom';
import PersonalInfo from './componentsRegister/PersonalInfo';
import Identificacion from './componentsRegister/Identificacion';
import DatosContacto from './componentsRegister/DatosContacto';
import Cuenta from './componentsRegister/Cuenta';
import { Button } from 'primereact/button';
import TerminosYCondiciones from './componentsRegister/TerminosYCondiciones';
import { Divider } from 'primereact/divider';
import { ServicioCredencial } from '../../service/ServicioCredencial';

const Register = (props) => {

    const history = new useHistory()

    const cambiarPanel = (panel) =>{
        history.push(`/log/register/${panel}`)
    }

    const avanzarPage = () =>{
        let numPage = parseInt(window.location.href.substr(-1))
        cambiarPanel(numPage+1)
        setTabIndex(numPage)
    }
    const retrocederPage = () =>{
        let numPage = parseInt(window.location.href.substr(-1))
        cambiarPanel(numPage-1)
        setTabIndex(numPage-2)
    }

    const [tabIndex, setTabIndex] = useState(parseInt(window.location.href.substr(-1))-1)

    useEffect(() => {
    }, [])

    const [data, setData] = useState({
        nombreUsuario:'',
        apellidoUsuario:'',
        correoUsuario:'',
        correoUsuario2: '',
        telefonoFijo:'',
        telefonoCelular:'',
        fechaNacimientoUsuario:'',
        idTipoDocumento_FK:'',
        numeroDocumento:'',
        fechaExpedicionDoc:'',
        LugarExpedicionDoc:'',
        idCiudad_FK:'',

        username:'',
        pass:'',
        pass2:''
    })

    const wizardItems = [
        { label: 'Informacion Basica',icon: 'pi pi-book',command:()=>cambiarPanel(1),disabled: true },
        { label: 'Identificación',icon: 'pi pi pi-id-card',command:()=>cambiarPanel(2), disabled: true },
        { label: 'Datos Contacto',icon: 'pi pi-comments',command:()=>cambiarPanel(3),disabled: true },
        { label: 'Cuenta', icon: 'pi pi-home',command:()=>cambiarPanel(4),disabled: true }
    ];

    const guardarData = (datos) =>{
        setData({
            ...data,
            ...datos
        })
        avanzarPage()
    }

    const [dialog, setDialog] = useState(false)

    const RegistrarData = (datos) =>{
        setData({
            ...data,
            ...datos
        })
        setDialog(true)
    }

    const errormsg = () =>{
        props.toast.current.show({ severity: 'error', summary: 'Error', detail: "Campos Incompletos en esta sección", life: 3000 });
    }

    const serviCredencial = new ServicioCredencial()

    const generarNuevoUsuario = () =>{
        if(!data.nombreUsuario||!data.apellidoUsuario||!data.fechaNacimientoUsuario||!data.idCiudad_FK){
            cambiarPanel(1)
            errormsg()
            setDialog(false)
        }else if(!data.idTipoDocumento_FK||!data.numeroDocumento||!data.fechaExpedicionDoc||!data.LugarExpedicionDoc){
            cambiarPanel(2)
            errormsg()
            setDialog(false)
        }else if(!data.correoUsuario||!data.correoUsuario2||!data.telefonoCelular){
            cambiarPanel(3)
            errormsg()
            setDialog(false)
        }else{
            console.log("si")
            serviCredencial.register(data).then(()=>{
                console.log("tambien")
                console.log(data)
                props.toast.current.show({ severity: 'success', summary: 'Success', detail: "Se ha Registrado Correctamente", life: 3000 });
                handleLoguearse()
            }).catch(err=>{
                console.log(err)
            })
        }
    }

    const hideDialog = () =>{
        setDialog(false)
        props.toast.current.show({ severity: 'error', summary: 'Error', detail: "Para Continuar Con El Registro Debe Aceptar Los Términos Y Condiciones", life: 3000 });
    }

    const dialogFooter = (
        <>
            <Button label="No Acepto" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Acepto" icon="pi pi-check" className="p-button-text" type="button" onClick={generarNuevoUsuario} />
        </>
    );

    const handleLoguearse = () =>{
        history.push('/log/login')
    }

    return (
        <div className="flex align-items-center justify-content-center" style={{width: "100%", height: "100%", position: 'fixed'}}>
            <div className="card p-5">
                <div className="flex align-items-center justify-content-center">

                    <div className="card-w-title">
                        <h5>Registra Tu Información Personal</h5>
                        <TabMenu activeIndex={tabIndex} model={wizardItems} onTabChange={(e) => setTabIndex(e.index )} />

                        <Route path='/log/register/1'>
                            <PersonalInfo guardarData={guardarData} data={data}/>
                        </Route>

                        <Route path='/log/register/2'>
                            <Identificacion guardarData={guardarData} retrocederPage={retrocederPage} data={data}/>
                        </Route>
                        <Route path='/log/register/3'>
                            <DatosContacto guardarData={guardarData} retrocederPage={retrocederPage} data={data}/>
                        </Route>
                        <Route path='/log/register/4'>
                            <Cuenta RegistrarData={RegistrarData} retrocederPage={retrocederPage} data={data}/>
                        </Route>
                    </div>
                </div>

                <Divider align="center">
                    <small>Tengo una cuenta</small>
                </Divider>

                <div className="flex align-items-center justify-content-center">
                    <Button onClick={handleLoguearse} label="Iniciar Sesion" icon="pi pi-user-plus" style={{backgroundColor:'var(--green-300)', border:'var(--green-300)'}} ></Button>
                </div>
            </div>

            <Dialog header="Términos y Condiciones" visible={dialog} style={{ width: '50vw' }} footer={dialogFooter} onHide={hideDialog}>
                <p><b>Para Continuar Con El Registro Es Necesario Aceptar Los Términos Y Condiciones</b></p>
                <TerminosYCondiciones/>
            </Dialog>

        </div>
    );
}


export default Register
