import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import { ServicioUsu } from '../../service/ServicioUsu';
import SelectTipoDocumento from '../../components/tipoDoc/SelectTipoDocumento';
import { Dropdown } from 'primereact/dropdown';
import SelectCiudad from '../../components/selectCiudad/SelectCiudad';
import { useFormik } from 'formik';

import { RiUserReceivedFill,RiUserSharedFill } from "react-icons/ri";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaUserAlt, FaRegCalendarAlt, FaAddressCard } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail, MdOutlinePhoneAndroid, MdMarkEmailRead } from "react-icons/md";
const IndexUsu = () => {
    let today = new Date()

    let emptyUsuario = {
        idUsuario: "",
            nombreUsuario: '',
            apellidoUsuario: '',
            correoUsuario: '',
            correoUsuario2: '',
            telefonoFijo: '',
            telefonoCelular: '',
            fechaNacimientoUsuario:'',
            idTipoDocumento_FK:'',
            numeroDocumento:'',
            fechaExpedicionDoc:'',
            LugarExpedicionDoc:'',
            idCiudad_FK:'',
            TipoDocumento:{
                nombreTipoDoc:''
            },
            Ciudad:{
                nombreCiudad:''
            },
            LugarExpedicionDocu:{
                nombreCiudad:''
            }

    };

    const [usuarios, setUsuarios] = useState(null);
    const [updateDialog, setUpdateDialog] = useState(false);
    const [listDialog, setListDialog] = useState(false);
    const [changeStateDialog, setchangeStateDialog] = useState(false);
    //editar o mostrar uno nomas
    const [usuario, setUsuario] = useState(emptyUsuario);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const [estado, setEstado] = useState(true)

    const [pageState, setPageState] = useState(true)

    const servicioUsu = new ServicioUsu();

    let iconchangeState = `pi ${(pageState)?'pi-trash':'pi-check-circle'}`


    const getUsuariosInactivos=()=>{
        servicioUsu.getUsuariosInactivos().then(res => setUsuarios(res.data));
    }

    const getUsuariosActivos=()=>{
        servicioUsu.getUsuarios().then(res => setUsuarios(res.data));
    }
    //Obtener la data para llenar las tables
    useEffect(() => {
        const servicioUsu = new ServicioUsu();
        servicioUsu.getUsuarios().then(res => setUsuarios(res.data));
        setPageState(true)
    },[estado]);

    const listarUsuariosInactivos = () =>{
        setPageState(false)
        getUsuariosInactivos()
        //Mensaje de exito :D
        toast.current.show({ severity: 'success', summary: 'Cambio En La Consulta', detail: `Mostrando Usuarios Inactivos`, life: 3000 });
    }

    const listarUsuariosActivos = () =>{
        setPageState(true)
        getUsuariosActivos()
        //Mensaje de exito :D
        toast.current.show({ severity: 'success', summary: 'Cambio En La Consulta', detail: `Mostrando Usuarios Activos`, life: 3000 });
    }

    //Abrir el modal pero vacio, lo que significa que va a ser un nuevo usuario
    const openNew = () => {
        //Aqui le establece el valor vacio por defecto
        setUsuario(emptyUsuario);
        formik.setValues(emptyUsuario)
        setUpdateDialog(true);
    }

    //Esconder el modal
    const hideDialog = () => {
        setUpdateDialog(false);
        setListDialog(false);
    }

    //Esconde la ventana de dialogo de el delete
    const hidechangeStateDialog = () => {
        setchangeStateDialog(false);
    }

    //accion que se realiza al darle click a el icono de editar, recibe un objeto y este objeto depende de la posision en la tabla

    const listUsuario = (usuario) => {
        //envia los datos de este objeto a la "plantilla"
        setUsuario({ ...usuario });
        //muestra la ventana emerjente de actualizacion de producto
        setListDialog(true);
    }

    //esta funcion muestra la ventana de "está seguro de borrar?"
    const confirmChangeState = (usuario) => {
        //de igual manera establece la "plantilla" para guardar el id del producto que va a borrar
        setUsuario(usuario);
        //muestra la ventana de dialogo
        setchangeStateDialog(true);
    }

    //funcion para cambiar el estado de un usuario
    const changeState = () => {
            servicioUsu.changeStateUsuario(usuario.idUsuario,pageState?'inhabilitar':'activar').then(res=>{

            //Mostrar mensaje de Proceso realizado full 4k esitoso
            toast.current.show({ severity: 'warn', summary: 'Todo Bien', detail: `Usuario ${pageState?'Inactivado':'Activado'}`, life: 3000 });
        })
        hidechangeStateDialog()

        pageState?getUsuariosActivos():getUsuariosInactivos()
    }

    //esto es para exportar la info de la tabla a CSV... si se puede modificar, ni idea
    const exportCSV = () => {
        dt.current.exportCSV();
    }


    //Codigo de las acciones de la tabla
    const leftToolbarTemplate = () => {
        return (
            //retorna un fragmento de codigo con botones, parte superior izquierda
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nuevo" icon={AiOutlineUserAdd} iconPos="right" className="p-button-success mr-2" onClick={openNew} />
                </div>
            </React.Fragment>
        )
    }

    //Esto al parecer son las acciones disponibles de exportacion, parte superior derecha
    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Generar CSV" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }

    const nombreBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nombre</span>
                {rowData.nombreUsuario}
            </>
        );
    }

    const apellidoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Apellido</span>
                {rowData.apellidoUsuario}
            </>
        );
    }


    const celularBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Celular</span>
                {rowData.telefonoCelular}
            </>
        );
    }

    const documentoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Documento</span>
                {rowData.numeroDocumento}
            </>
        );
    }

    const barrioBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Ciudad</span>
                {rowData.Ciudad.nombreCiudad}
            </>
        );
    }

    const avatarBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Avatar</span>
                <img src={'assets/layout/images/inecesario.gif'} alt={rowData.image} width="70" />
            </>
        )
    }

    //corresponde a la columna de las acciones
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2 mb-1" onClick={() => editUsuario(rowData)} />
                <Button icon="pi pi-eye" className="p-button-rounded p-button-info mr-2 mb-1" onClick={() => listUsuario(rowData)} />
                <Button icon={iconchangeState} className="p-button-rounded p-button-warning" onClick={() => confirmChangeState(rowData)} />
            </div>

        );
    }

    //Parte Superior de la tabla, donde está el search, parece que el search solo setea un estado que se define antes...
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">
                Usuarios {(pageState)?'Activos':'Inactivos'}
            <Button icon={(pageState)?RiUserReceivedFill:RiUserSharedFill} onClick={(pageState)?listarUsuariosInactivos:listarUsuariosActivos} tooltip={`Listar Usuarios ${(pageState)?'Inactivos':'Activos'}`} className="p-button-rounded p-button-secondary p-button-text" />
            </h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );


    //La parte inferior de el dialog de borrado, lo mismo de antes y sus dos botones
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hidechangeStateDialog} />
            <Button label="Deacuerdo" icon="pi pi-check" className="p-button-text" onClick={changeState} />
        </>
    );

    //estilado del selector de año y mes del calendario
    const monthNavigatorTemplate=(e)=> {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} style={{ lineHeight: 1 }} />;
    }

    const yearNavigatorTemplate=(e)=> {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} className="p-ml-2" style={{ lineHeight: 1 }} />;
    }

    //footer del mostrar usuario por individual
    const footerList = <span>
        <Button label="Cerrar" icon="pi pi-times" className="p-button-secondary" onClick={hideDialog}/>
    </span>;

    //FORMIK


    const formik = useFormik({
        initialValues: emptyUsuario,
        validate: (data) => {
            let errors = {};
            if (!data.nombreUsuario) {
                errors.nombreUsuario = 'El Nombre es obligatorio.';
            }else if(!(data.nombreUsuario.length >= 3 && data.nombreUsuario.length <= 25)){
                errors.nombreUsuario = 'Cantidad de caracteres de 3 a 25 .';
            }

            if (!data.apellidoUsuario) {
                errors.apellidoUsuario = 'El Apellido es obligatorio.';
            }

            if (!data.correoUsuario) {
                errors.correoUsuario = 'El Correo es obligatorio.';
            }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.correoUsuario)){
                errors.correoUsuario = 'Debe ingresar un formato valido.';
            }



            if (!/^\d{0,20}$/.test(data.telefonoFijo)){
                errors.telefonoFijo = 'El Telefono debe ser un numero.';
            }

            if(!data.telefonoCelular){
                errors.telefonoCelular = 'El Celular es obligatorio.';
            }
            if (!/^\d{0,20}$/.test(data.telefonoCelular)){
                errors.telefonoCelular = 'El Celular debe ser un numero.';
            }

            if(!data.idCiudad_FK || data.idCiudad_FK === ''){
                errors.idCiudad_FK = 'La Ciudad De Recidencia es obligatoria.';
            }

            if(!data.idUsuario){
                if (!data.correoUsuario2){
                    errors.correoUsuario2 = 'La Verificacion es obligatoria.';
                }else if(!(data.correoUsuario === data.correoUsuario2)){
                    errors.correoUsuario2 = 'Los Campos no coinciden.';
                }

                if(!data.fechaNacimientoUsuario){
                    errors.fechaNacimientoUsuario = 'La Fecha es obligatoria.';
                }


                if(!data.idTipoDocumento_FK){
                    errors.idTipoDocumento_FK = 'El Tipo de Documento de es obligatorio.';
                }

                if(!data.numeroDocumento){
                    errors.numeroDocumento = 'El Número de Documento de es obligatorio.';
                }else if(!/^\d{0,20}$/.test(data.numeroDocumento)){
                    errors.numeroDocumento = 'El Número de Documento debe ser un numero.';
                }

                if(!data.fechaExpedicionDoc){
                    errors.fechaExpedicionDoc = 'La Fecha de Expedicion es obligatoria.';
                }

                if(!data.LugarExpedicionDoc){
                    errors.LugarExpedicionDoc = 'El Lugar De Expedicion es obligatorio.';
                }

            }

            return errors;
        },
        onSubmit: (data) => {
            if (data.idUsuario) {

                servicioUsu.updateUsuario(data.idUsuario, data).then(res=>{
                    //anuncio de exito :D
                    toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: `Usuario ${data.nombreUsuario} Actualizado`, life: 3000 });
                })
            }
            else {
                servicioUsu.createUsuario(data).then(res=>{
                    //Mensaje de exito :D
                    toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: `El usuario ${data.nombreUsuario} A sido Creado Con Exito`, life: 3000 });
                })
            }
            //Escone la alerta
            setUpdateDialog(false);
            //resetea el formulario o mejor dicho el objeto
            setUsuario(emptyUsuario);

            setEstado(!estado)
            formik.resetForm();
        }
    });


    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    //La parte inferior de la ventana de dialogo de update/create, con dos botones: cancelar que lo cierra y guardar que genra el cambio
    const productDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" type="button" onClick={()=>formik.handleSubmit()} />
        </>
    );

    const editUsuario = (usuario) => {
        formik.setValues(usuario)
        //muestra la ventana emerjente de actualizacion de usuario
        setUpdateDialog(true);
    }


    //aqui ya empieza el codigo normal :D
    return (

        <div className="grid crud-demo">

            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} position="bottom-right"/>
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                    <DataTable ref={dt} value={usuarios}
                        dataKey="id" paginator rows={7} rowsPerPageOptions={[7, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Registros {first} a {last} de un total de {totalRecords}"
                        globalFilter={globalFilter} emptyMessage="No se encontro ningun registro." header={header}>
                        <Column body={avatarBodyTemplate}></Column>
                        <Column field="nombreUsuario" header="Nombre" sortable body={nombreBodyTemplate}></Column>
                        <Column field="apellidoUsuario" header="Apellido" sortable body={apellidoBodyTemplate}></Column>
                        <Column field="telefonoCelular" header="Ceular" body={celularBodyTemplate} sortable></Column>
                        <Column field="numeroDocumento" header="Documento" sortable body={documentoBodyTemplate}></Column>
                        <Column field="Ciudad.nombreCiudad" header="Barrio" body={barrioBodyTemplate} sortable></Column>
                        <Column header="Mas" body={actionBodyTemplate} style={{ width: '70px' }} ></Column>
                    </DataTable>

                    {/* Aqui va la ventana de editar/nuevo */}
                    <Dialog visible={updateDialog} style={{ width: '650px' }} header="Gestion Usuario" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>

                <div className="p-d-flex p-jc-center">
                <div className="card">
                    <h5 className="p-text-center">{(!formik.values.idUsuario)?"Nuevo Usuario":`Editando a ${formik.values.nombreUsuario}` }</h5>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="formgrid grid my-4">
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <i><FaUserAlt/></i>
                                    <InputText id="nombreUsuario" name="nombreUsuario" value={formik.values.nombreUsuario} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('nombreUsuario') })} />
                                    <label htmlFor="nombreUsuario" className={classNames({ 'p-error': isFormFieldValid('nombreUsuario') })}>Nombre*</label>
                                </span>
                                {getFormErrorMessage('nombreUsuario')}
                            </div>
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <i><FaUserAlt/></i>
                                    <InputText id="apellidoUsuario" name="apellidoUsuario" value={formik.values.apellidoUsuario} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('apellidoUsuario') })} />
                                    <label htmlFor="apellidoUsuario" className={classNames({ 'p-error': isFormFieldValid('apellidoUsuario') })}>Apellido*</label>
                                </span>
                                {getFormErrorMessage('apellidoUsuario')}
                            </div>
                        </div>

                        <div className="formgrid grid my-4">
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <i><MdEmail /></i>
                                    <InputText id="correoUsuario" name="correoUsuario" value={formik.values.correoUsuario} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('correoUsuario') })} />
                                    <label htmlFor="correoUsuario" className={classNames({ 'p-error': isFormFieldValid('correoUsuario') })}>Correo*</label>
                                </span>
                                {getFormErrorMessage('correoUsuario')}
                            </div>
                            {!formik.values.idUsuario &&
                                <div className="p-field col">
                                    <span className="p-float-label p-input-icon-right">
                                        <i><MdMarkEmailRead/></i>
                                        <InputText id="correoUsuario2" name="correoUsuario2" value={formik.values.correoUsuario2} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('correoUsuario2') })} />
                                        <label htmlFor="correoUsuario2" className={classNames({ 'p-error': isFormFieldValid('correoUsuario2') })}>Verificacion De Correo*</label>
                                    </span>
                                    {getFormErrorMessage('correoUsuario2')}
                                </div>
                            }
                        </div>

                        <div className="formgrid grid my-4">
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <i><BsFillTelephoneFill/></i>
                                    <InputText id="telefonoFijo" name="telefonoFijo" value={formik.values.telefonoFijo} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('telefonoFijo') })} />
                                    <label htmlFor="telefonoFijo" className={classNames({ 'p-error': isFormFieldValid('telefonoFijo') })}>Telefono</label>
                                </span>
                                {getFormErrorMessage('telefonoFijo')}
                            </div>
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <i><MdOutlinePhoneAndroid/></i>
                                    <InputText id="telefonoCelular" name="telefonoCelular" value={formik.values.telefonoCelular} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('telefonoCelular') })} />
                                    <label htmlFor="telefonoCelular" className={classNames({ 'p-error': isFormFieldValid('telefonoCelular') })}>Telefono Celular*</label>
                                </span>
                                {getFormErrorMessage('telefonoCelular')}
                            </div>
                        </div>

                        <div className="formgrid grid my-4">
                            {!formik.values.idUsuario &&
                                <div className="p-field col">
                                    <span className="p-float-label p-input-icon-right">
                                        <Calendar  name="fechaNacimientoUsuario" yearRange={`${today.getFullYear()-90}:${today.getFullYear()-14}`} id="fechaNacimientoUsuario" value={formik.values.fechaNacimientoUsuario} onChange={formik.handleChange}  monthNavigator yearNavigator className={classNames({ 'p-invalid': isFormFieldValid('fechaNacimientoUsuario') })}
                                        readOnlyInput monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate}/>
                                        <i><FaRegCalendarAlt/></i>
                                        <label htmlFor="fechaNacimientoUsuario" className={classNames({ 'p-error': isFormFieldValid('fechaNacimientoUsuario') })}>Fecha Nacimiento*</label>
                                    </span>
                                    {getFormErrorMessage('fechaNacimientoUsuario')}
                                </div>
                            }
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <SelectCiudad name="idCiudad_FK" value={formik.values.idCiudad_FK} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('idCiudad_FK') })} />
                                    <label htmlFor="idCiudad_FK" className={classNames({ 'p-error': isFormFieldValid('idCiudad_FK') })}>Ciudad Recidencia*</label>
                                </span>
                                {getFormErrorMessage('idCiudad_FK')}
                            </div>
                        </div>
                        {!formik.values.idUsuario &&
                            <div>
                                <label htmlFor="idTipoDocumento_FK" className={classNames({ 'p-error': isFormFieldValid('idTipoDocumento_FK') })}>Tipo Documento*</label>
                                <SelectTipoDocumento name="idTipoDocumento_FK" value={formik.values.idTipoDocumento_FK} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('idTipoDocumento_FK') })}/>
                                {getFormErrorMessage('idTipoDocumento_FK')}
                            </div>
                        }
                        {!formik.values.idUsuario &&
                            <div className="formgrid grid my-4">
                                <div className="p-field col">
                                    <span className="p-float-label p-input-icon-right">
                                        <i><FaAddressCard/></i>
                                        <InputText id="numeroDocumento" name="numeroDocumento" value={formik.values.numeroDocumento} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('numeroDocumento') })} />
                                        <label htmlFor="numeroDocumento" className={classNames({ 'p-error': isFormFieldValid('numeroDocumento') })}>Numero De Documento*</label>
                                    </span>
                                    {getFormErrorMessage('numeroDocumento')}
                                </div>
                                <div className="p-field col">
                                    <span className="p-float-label p-input-icon-right">
                                        <Calendar name="fechaExpedicionDoc" yearRange={`${today.getFullYear()-90}:${today.getFullYear()}`} id="fechaExpedicionDoc" value={formik.values.fechaExpedicionDoc} onChange={formik.handleChange}  monthNavigator yearNavigator className={classNames({ 'p-invalid': isFormFieldValid('fechaExpedicionDoc') })}
                                        readOnlyInput monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate}/>
                                        <i><FaRegCalendarAlt/></i>
                                        <label htmlFor="fechaExpedicionDoc" className={classNames({ 'p-error': isFormFieldValid('fechaExpedicionDoc') })}>Fecha Expedicion Doc*</label>
                                    </span>
                                    {getFormErrorMessage('fechaExpedicionDoc')}
                                </div>
                            </div>
                        }
                        {!formik.values.idUsuario &&
                            <div className="p-field my-4">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-envelope" />
                                    <SelectCiudad name="LugarExpedicionDoc" value={formik.values.LugarExpedicionDoc} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('LugarExpedicionDoc') })} />
                                    <label htmlFor="LugarExpedicionDoc" className={classNames({ 'p-error': isFormFieldValid('LugarExpedicionDoc') })}>Lugar Expedicion Documento*</label>
                                </span>
                                {getFormErrorMessage('LugarExpedicionDoc')}
                            </div>
                        }
                    </form>
                </div>
            </div>


                    </Dialog>

                    <Dialog visible={listDialog} style={{ width: '450px' }} header={`${usuario.nombreUsuario} ${usuario.apellidoUsuario}`} modal className="p-fluid" footer={footerList} onHide={hideDialog}>
                        <Card>
                            <p><strong>Correo:</strong>{usuario.correoUsuario}</p>
                            <p><strong>Telefono Fijo:</strong>{usuario.telefonoFijo}</p>
                            <p><strong>Telefono Celular:</strong>{usuario.telefonoCelular}</p>
                            <p><strong>Telefono Celular:</strong>{usuario.telefonoCelular}</p>
                            <p><strong>Fecha Nacimiento:</strong>{usuario.fechaNacimientoUsuario}</p>
                            <p><strong>Tipo Documento:</strong>{usuario.TipoDocumento.nombreTipoDoc}</p>
                            <p><strong>Numero Documento:</strong>{usuario.numeroDocumento}</p>
                            <p><strong>Fecha Expedicion Documento:</strong>{usuario.fechaExpedicionDoc}</p>
                            <p><strong>Lugar Expedicion Documento:</strong>{usuario.LugarExpedicionDocu.nombreCiudad}</p>
                            <p><strong>Ciudad Residencia:</strong>{usuario.Ciudad.nombreCiudad}</p>
                        </Card>
                    </Dialog>

                    <Dialog visible={changeStateDialog} style={{ width: '450px' }} header="¡Cuidado!" modal footer={deleteProductDialogFooter} onHide={hidechangeStateDialog}>
                        <div className="flex align-items-center justify-content-center" style={{color:'var(--yellow-700)' }}>
                            <i className="pi pi-exclamation-triangle mr-3 " style={{ fontSize: '3rem' }} />
                            {usuario && <span>¿Está seguro de {(pageState)?'Inactivar':'Activar'} a <b>{usuario.nombreUsuario}</b>?</span>}
                        </div>
                    </Dialog>

                </div>
            </div>
        </div>
    )
}

export default IndexUsu
