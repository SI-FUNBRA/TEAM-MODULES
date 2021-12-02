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
import SelectBarrio from '../../components/selectCiudad/SelectCiudad';
import { Dropdown } from 'primereact/dropdown';

const IndexUsu = () => {
let today = new Date()

let emptyProduct = {
        idUsuario: null,
        nombreUsuario: '',
        apellidoUsuario: '',
        correoUsuario: '',
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
    const [usuario, setUsuario] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const [estado, setEstado] = useState(true)

    const [pageState, setPageState] = useState(true)

    const servicioUsu = new ServicioUsu();

    let iconchangeState = `pi ${(pageState)?'pi-trash':'pi-check-circle'}`

    const getUsuariosActivos=()=>{
        const servicioUsu = new ServicioUsu();
        servicioUsu.getUsuarios().then(res => setUsuarios(res.data));
    }
    const getUsuariosInactivos=()=>{
        const servicioUsu = new ServicioUsu();
        servicioUsu.getUsuariosInactivos().then(res => setUsuarios(res.data));
    }

    //Obtener la data para llenar las tables
    useEffect(() => {
        setPageState(true)
        getUsuariosActivos()
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

    //Abrir el modal pero vacio, lo que significa que va a ser un nuevo producto
    const openNew = () => {
        //Aqui le establece el valor vacio por defecto
        setUsuario(emptyProduct);
        setSubmitted(false);
        setUpdateDialog(true);
    }

    //Esconder el modal
    const hideDialog = () => {
        setSubmitted(false);
        setUpdateDialog(false);
        setListDialog(false);
    }

    //Esconde la ventana de dialogo de el delete
    const hidechangeStateDialog = () => {
        setchangeStateDialog(false);
    }

    //accion para guardar un registro
    const saveProduct = () => {
        setSubmitted(true);

            let _usuarios = [usuarios];
            //Esto verifica que el producto tenga un id para actualizarlo, si no es asi es un nuevo registo
            if (usuario.idUsuario) {
                servicioUsu.updateUsuario(usuario.idUsuario,usuario).then(res=>{
                    //anuncio de exito :D
                    toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: `Usuario ${usuario.nombreUsuario} Actualizado`, life: 3000 });
                })
                setEstado(!estado)
            }
            else {
                servicioUsu.createUsuario(usuario).then(res=>{
                    //Mensaje de exito :D
                    toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: `El usuario ${usuario.nombreUsuario} A sido Creado Con Exito`, life: 3000 });
                })
                setEstado(!estado)
            }

            setUsuarios(_usuarios);
            //Escone la alerta
            setUpdateDialog(false);
            //resetea el formulario o mejor dicho el objeto
            setUsuario(emptyProduct);

    }

    //accion que se realiza al darle click a el icono de editar, recibe un objeto y este objeto depende de la posision en la tabla
    const editUsuario = (usuario) => {
        //envia los datos de este objeto a la "plantilla"
        setUsuario({ ...usuario });
        //muestra la ventana emerjente de actualizacion de producto
        setUpdateDialog(true);
    }
    const listUsuario = (usuario) => {
        //envia los datos de este objeto a la "plantilla"
        setUsuario({ ...usuario });
        //muestra la ventana emerjente de actualizacion de producto
        setListDialog(true);
    }

    //esta funcion muestra la ventana de "está seguro de borrar?"
    const confirmChangeState = (product) => {
        //de igual manera establece la "plantilla" para guardar el id del producto que va a borrar
        setUsuario(product);
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

    //Esto es para que el imput funcione bien
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _usuario = { ...usuario };
        _usuario[`${name}`] = val;
        setUsuario(_usuario);
    }

    //Codigo de las acciones de la tabla
    const leftToolbarTemplate = () => {
        return (
            //retorna un fragmento de codigo con botones, parte superior izquierda
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nuevo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
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

    const rolBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Rol</span>
                {rowData.UsuarioRol.idRol}
            </>
        )
    }

    const avatarBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Avatar</span>
                <img src={'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/20997957490547.59e4b5df6786a.gif'} alt={rowData.image} width="70" />
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
            <Button onClick={(pageState)?listarUsuariosInactivos:listarUsuariosActivos} style={{transform: 'rotate(90deg)'}} icon="pi pi-sort-alt" iconPos="right" tooltip={`Listar Usuarios ${(pageState)?'Inactivos':'Activos'}`} className="p-button-rounded p-button-secondary p-button-text"/>
            </h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    //La parte inferior de la ventana de dialogo de update/create, con dos botones: cancelar que lo cierra y guardar que genra el cambio
    const productDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </>
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

    //aqui ya empieza el codigo normal :D
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                    <DataTable ref={dt} value={usuarios} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
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
                        <Column field="UsuarioRol.idRol" header="Rol" body={rolBodyTemplate} sortable></Column>
                        <Column header="Mas" body={actionBodyTemplate} style={{ width: '70px' }} ></Column>
                    </DataTable>
                    {/* Aqui va la ventana de editar/nuevo */}
                    <Dialog visible={updateDialog} style={{ width: '650px' }} header="Gestion Usuario" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>

                        {/* Agregar la ruta de imagen a la api */}
                        {usuario.image && <img src={`assets/demo/images/${usuario.image}`} alt={usuario.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="nombreUsuario">Nombre</label>
                                <InputText id="nombreUsuario" value={usuario.nombreUsuario} onChange={(e) => onInputChange(e, 'nombreUsuario')} required autoFocus className={classNames({ 'p-invalid': submitted && !usuario.nombreUsuario })} />
                                {submitted && !usuario.nombreUsuario && <small className="p-invalid">Se Requiere El Nombre</small>}
                            </div>
                            <div className="field col">
                                <label htmlFor="apellidoUsuario">Apellido</label>
                                <InputText id="apellidoUsuario" value={usuario.apellidoUsuario} onChange={(e) => onInputChange(e, 'apellidoUsuario')} required className={classNames({ 'p-invalid': submitted && !usuario.apellidoUsuario })} />
                                {submitted && !usuario.apellidoUsuario && <small className="p-invalid">Se Requiere El Apellido</small>}
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="correoUsuario">Correo</label>
                            <InputText id="correoUsuario" value={usuario.correoUsuario} onChange={(e) => onInputChange(e, 'correoUsuario')} required className={classNames({ 'p-invalid': submitted && !usuario.correoUsuario })} />
                            {submitted && !usuario.correoUsuario && <small className="p-invalid">Se Requiere El Correo</small>}
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="telefonoFijo">Telefono Fijo</label>
                                <InputText id="telefonoFijo" value={usuario.telefonoFijo} onChange={(e) => onInputChange(e, 'telefonoFijo')} />
                            </div>
                            <div className="field col">
                                <label htmlFor="telefonoCelular">Telefono Celular</label>
                                <InputText id="telefonoCelular" value={usuario.telefonoCelular} onChange={(e) => onInputChange(e, 'telefonoCelular')} required className={classNames({ 'p-invalid': submitted && !usuario.telefonoCelular })} />
                                {submitted && !usuario.telefonoCelular && <small className="p-invalid">Se Requiere El Telefono Celular</small>}
                            </div>
                        </div>

                        <div className="formgrid grid">
                            {!usuario.idUsuario &&
                                <div className="field col">
                                    <label htmlFor="fechaNacimientoUsuario">Fecha Nacimiento</label>
                                    <Calendar yearRange={`${today.getFullYear()-90}:${today.getFullYear()-14}`} id="fechaNacimientoUsuario" value={usuario.fechaNacimientoUsuario} onChange={(e) => onInputChange(e, 'fechaNacimientoUsuario')}monthNavigator yearNavigator required className={classNames({ 'p-invalid': submitted && !usuario.fechaExpedicionDoc })}
                                    monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate}/>
                                    {submitted && !usuario.fechaNacimientoUsuario && <small className="p-invalid">Se Requiere Seleccionar Una Fecha</small>}
                                </div>
                            }
                            <div className="field col">
                                <label>Ciudad De Residencia</label>
                                <SelectBarrio idCiudad={usuario.idCiudad_FK} onInputChange={onInputChange} name={'idCiudad_FK'}/>
                            </div>

                        </div>

                        <SelectTipoDocumento idTipoDoc={usuario.idTipoDocumento_FK} onInputChange={onInputChange}/>

                        <div className="formgrid grid">
                            {!usuario.idUsuario &&
                                <div className="field col">
                                    <label htmlFor="numeroDocumento">Numero Documento</label>
                                    <InputText id="numeroDocumento" value={usuario.numeroDocumento} onChange={(e) => onInputChange(e, 'numeroDocumento')} required className={classNames({ 'p-invalid': submitted && !usuario.numeroDocumento })} />
                                    {submitted && !usuario.numeroDocumento && <small className="p-invalid">Se Requiere El Numero De Documento</small>}
                                </div>
                            }
                            {!usuario.idUsuario &&
                                <div className="field col">
                                    <label htmlFor="fechaExpedicionDoc">Fecha Expedicion Documento</label>
                                    <Calendar yearRange={`${today.getFullYear()-90}:${today.getFullYear()}`} id="fechaExpedicionDoc" value={usuario.fechaExpedicionDoc} onChange={(e) => onInputChange(e, 'fechaExpedicionDoc')}monthNavigator yearNavigator required className={classNames({ 'p-invalid': submitted && !usuario.fechaExpedicionDoc })}
                                    monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate}/>
                                    {submitted && !usuario.fechaExpedicionDoc && <small className="p-invalid">Se Requiere Seleccionar Una Fecha</small>}
                                </div>
                            }
                        </div>
                        {!usuario.idUsuario &&
                        <div className="field">
                            <label>Lugar Expedicion Documento</label>
                            <SelectBarrio idCiudad={usuario.LugarExpedicionDoc} onInputChange={onInputChange} name={'LugarExpedicionDoc'}/>
                        </div>
                        }

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
