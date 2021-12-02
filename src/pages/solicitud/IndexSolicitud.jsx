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
import { FileUpload } from 'primereact/fileupload';
import { ServicioSolicitudAdopcion } from '../../service/ServicioSolicitudAdopcion';
import SelectAnimal from '../../components/selectAnimal/selectAnimal';
import SelectUsuario from '../../components/selectUsuario/SelectUsuario'
import { Dropdown } from 'primereact/dropdown';


const IndexSolicitud = () => {
let today = new Date()

let emptySolicitud = {
    idSolicitudAdopcion: null,
    fechaSolicitud: '',
    documentoSolicitud: '',
    idUsuario_FK: '',
    idAnimal_FK: '',
    Usuario:{
        nombreUsuario:'',
        apellidoUsuario: '',
        numeroDocumento: ''
    },
    Animal:{
        nombreAnimal:''
    },
};

const [solicitudes, setSolicitudes] = useState(null);
const [updateDialog, setUpdateDialog] = useState(false);
const [listDialog, setListDialog] = useState(false);
const [changeStateDialog, setchangeStateDialog] = useState(false);
//editar o mostrar uno nomas
const [solicitud, setSolicitud] = useState(emptySolicitud);
const [selectedSolicitudes, setSelectedSolicitudes] = useState(null);
const [submitted, setSubmitted] = useState(false);
const [globalFilter, setGlobalFilter] = useState(null);
const toast = useRef(null);
const dt = useRef(null);

const [estado, setEstado] = useState(true)

const [pageState, setPageState] = useState(true)

const servicioSolicitud = new ServicioSolicitudAdopcion();

const getSolicitudes=()=>{
    const servicioSolicitud = new ServicioSolicitudAdopcion();
    servicioSolicitud.getSolicitudes().then(res => setSolicitudes(res.data));
}
const getSolicitudesAceptadas=()=>{
    const servicioSolicitud = new ServicioSolicitudAdopcion();
    servicioSolicitud.getSolicitudesAceptadas().then(res => setSolicitudes(res.data));
}

//Obtener la data para llenar las tables
useEffect(() => {
    setPageState(true)
    getSolicitudes()
},[estado]);

const listarSolicitudesAceptadas = () =>{
    setPageState(false)
    getSolicitudesAceptadas()
    //Mensaje de exito :D
    toast.current.show({ severity: 'success', summary: 'Cambio En La Consulta', detail: `Mostrando solicitudes aceptadas`, life: 3000 });
}

const listarSolicitudes = () =>{
    setPageState(true)
    getSolicitudes()
    //Mensaje de exito :D
    toast.current.show({ severity: 'success', summary: 'Cambio En La Consulta', detail: `Mostrando solicitudes`, life: 3000 });
}

//Abrir el modal pero vacio, lo que significa que va a ser un nuevo producto
const openNew = () => {
    //Aqui le establece el valor vacio por defecto
    setSolicitud(emptySolicitud);
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
const saveSolicitud = () => {
    setSubmitted(true);

        let _solicitudes = [solicitudes];
        //Esto verifica que el producto tenga un id para actualizarlo, si no es asi es un nuevo registo
        if (solicitud.idSolicitudAdopcion) {
            servicioSolicitud.updateSolicitud(solicitud.idSolicitudAdopcion, solicitud).then(res=>{
                //anuncio de exito :D
                toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: `Solicitud actualizada`, life: 3000 });
            })
            setEstado(!estado)
        }
        else {
            servicioSolicitud.createSolicitud(solicitud).then(res=>{
                //Mensaje de exito :D
                toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: `Solicitud de adopción creada exitosamente`, life: 3000 });
            })
            setEstado(!estado)
        }

        setSolicitudes(_solicitudes);
        //Escone la alerta
        setUpdateDialog(false);
        //resetea el formulario o mejor dicho el objeto
        setSolicitud(emptySolicitud);

}

//accion que se realiza al darle click a el icono de editar, recibe un objeto y este objeto depende de la posision en la tabla
const editSolicitud = (solicitud) => {
    //envia los datos de este objeto a la "plantilla"
    setSolicitud({ ...solicitud });
    //muestra la ventana emerjente de actualizacion de producto
    setUpdateDialog(true);
}
const listSolicitud = (solicitud) => {
    //envia los datos de este objeto a la "plantilla"
    setSolicitud({ ...solicitud });
    //muestra la ventana emerjente de actualizacion de producto
    setListDialog(true);
}

//esta funcion muestra la ventana de "está seguro de borrar?"
const confirmChangeState = (solicitud) => {
    //de igual manera establece la "plantilla" para guardar el id del producto que va a borrar
    setSolicitud(solicitud);
    //muestra la ventana de dialogo
    setchangeStateDialog(true);
}

//funcion para cambiar el estado de un usuario
const changeState = () => {
        servicioSolicitud.changeStateSolicitud(solicitud.idSolicitudAdopcion,pageState?'aceptar':'').then(res=>{

        //Mostrar mensaje de Proceso realizado full 4k esitoso
        toast.current.show({ severity: 'warn', summary: 'Todo Bien', detail: `Solicitud ${pageState?'Aceptada':'Pendiente'}`, life: 3000 });
    })
    hidechangeStateDialog()
    pageState?getSolicitudes():getSolicitudesAceptadas()
}
    //esto es para exportar la info de la tabla a CSV... si se puede modificar, ni idea
    const exportCSV = () => {
        dt.current.exportCSV();
    }

    //Esto es para que el imput funcione bien
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _solicitud = { ...solicitud };
        _solicitud[`${name}`] = val;
        setSolicitud(_solicitud);
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


    const fechaSolicitudBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Fecha de la solicitud</span>
                {rowData.fechaSolicitud}
            </>
        );
    }


    const nombreUsuarioBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nombre del adoptante</span>
                {rowData.Usuario.nombreUsuario}
            </>
        );
    }

    const apellidoUsuarioBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Apellido del adoptante</span>
                {rowData.Usuario.apellidoUsuario}
            </>
        );
    }

    const documentoUsuarioBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Documento del adoptante</span>
                {rowData.Usuario.numeroDocumento}
            </>
        );
    }

    const animalBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Animal</span>
                {rowData.Animal.nombreAnimal}
            </>
        )
    }

    const documentoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Fotografía</span>
                {rowData.documentoSolicitud}
            </>
        )
    }


    const estadoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Estado</span>
                {rowData.estadoAnimal}
            </>
        );
    }


    //corresponde a la columna de las acciones
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2 mb-1" onClick={() => editSolicitud(rowData)} />
                <Button icon="pi pi-eye" className="p-button-rounded p-button-info mr-2 mb-1" onClick={() => listSolicitud(rowData)} />
                <Button icon="pi-check-circle" className="p-button-rounded p-button-warning" onClick={() => confirmChangeState(rowData)} />
            </div>

        );
    }

    //Parte Superior de la tabla, donde está el search, parece que el search solo setea un estado que se define antes...
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">
                Solicitudes {(pageState)?' ':'Aceptadas'}
            <Button onClick={(pageState)? listarSolicitudesAceptadas: listarSolicitudes} style={{transform: 'rotate(90deg)'}} icon="pi pi-sort-alt" iconPos="right" tooltip={`Listando solicitudes ${(pageState) ? 'aceptadas':''}`} className="p-button-rounded p-button-secondary p-button-text"/>
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
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveSolicitud} />
        </>
    );
    //La parte inferior de el dialog de borrado, lo mismo de antes y sus dos botones
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hidechangeStateDialog} />
            <Button label="De acuerdo" icon="pi pi-check" className="p-button-text" onClick={changeState} />
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
                    <DataTable ref={dt} value={solicitudes} selection={selectedSolicitudes} onSelectionChange={(e) => setSelectedSolicitudes(e.value)}
                        dataKey="id" paginator rows={7} rowsPerPageOptions={[7, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Registros {first} a {last} de un total de {totalRecords}"
                        globalFilter={globalFilter} emptyMessage="No se encontro ningun registro." header={header}>
                        <Column body={documentoBodyTemplate}></Column>
                        <Column field="fechaSolicitud" header="Fecha de la solicitud" sortable body={fechaSolicitudBodyTemplate}></Column>
                        <Column field="Usuario.nombreUsuario" header="Nombre del adoptante" sortable body={nombreUsuarioBodyTemplate}></Column>
                        <Column field="Usuario.apellidoUsuario" header="Apellido del adoptante" sortable body={apellidoUsuarioBodyTemplate}></Column>
                        <Column field="Usuario.documentoUsuario" header="Documento del adoptante" sortable body={documentoUsuarioBodyTemplate}></Column>
                        <Column field="Animal.nombreAnimal" header="Fecha de llegada" body={animalBodyTemplate} sortable></Column>
                        <Column field="estadoSolicitud" header="Estado de la solicitud" body={estadoBodyTemplate}></Column>
                        <Column header="Más" body={actionBodyTemplate} style={{ width: '70px' }} ></Column>
                    </DataTable>
                    {/* Aqui va la ventana de editar/nuevo */}
                    <Dialog visible={updateDialog} style={{ width: '650px' }} header="Gestion Solicitud" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>

                    <form action="/animal" encType="multipart/form-data">
                        <div className="formgrid grid">
                            {!solicitud.idSolicitudAdopcion &&
                                <div className="field col">
                                    <label htmlFor="fechaSolicitud">Fecha de solicitud: </label>
                                    <Calendar yearRange={`${today.getFullYear()-90}:${today.getFullYear()-14}`} id="fechaSolicitud" value={solicitud.fechaSolicitud} onChange={(e) => onInputChange(e, 'fechaLlegada')}monthNavigator yearNavigator required className={classNames({ 'p-invalid': submitted && !solicitud.fechaSolicitud })}
                                    monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate}/>
                                    {submitted && !solicitud.fechaSolicitud && <small className="p-invalid">Se Requiere Seleccionar Una Fecha</small>}
                                </div>
                            }
                        </div>{estadoBodyTemplate}
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="nombreUsuario"> Tipo de animal</label>
                                <SelectUsuario idUsuario={solicitud.idUsuario_FK} onInputChange={onInputChange}/>
                            </div>
                            <div className="field col">
                                <label htmlFor="enfermedad">Enfermedad</label>
                                <SelectAnimal idAnimal={solicitud.idAnimal_FK} onInputChange={onInputChange}/>
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="docSolicitud">Documento de la solicitud</label>
                                <FileUpload value={solicitud.documentoSolicitud} onInputChange={onInputChange}/>
                            </div>
                        </div>
                        </form>
                    </Dialog>

                    <Dialog visible={listDialog} style={{ width: '450px' }} header={`${solicitud.idSolicitudAdopcion}`} modal className="p-fluid" footer={footerList} onHide={hideDialog}>
                        <Card>
                            <p><strong>FechaSolicitud: </strong>{solicitud.fechaSolicitud}</p>
                            <p><strong>Adoptante: </strong>{solicitud.Usuario.nombreUsuario + solicitud.Usuario.apellidoUsuario}</p>
                            <p><strong>Documento adoptante: </strong>{solicitud.Usuario.numeroDocumento}</p>
                            <p><strong>Animal: </strong>{solicitud.Animal.nombreAnimal}</p>
                            <p><strong>DocumentoSolicitud: </strong>{solicitud.documentoSolicitud}</p>
                        </Card>
                    </Dialog>

                    <Dialog visible={changeStateDialog} style={{ width: '450px' }} header="¡Cuidado!" modal footer={deleteProductDialogFooter} onHide={hidechangeStateDialog}>
                        <div className="flex align-items-center justify-content-center" style={{color:'var(--yellow-700)' }}>
                            <i className="pi pi-exclamation-triangle mr-3 " style={{ fontSize: '3rem' }} />
                            {solicitud && <span>¿Está seguro de cambiar el estado de la solicitud <b>{solicitud.idSolicitudAdopcion}</b>?</span>}
                        </div>
                    </Dialog>

                </div>
            </div>
        </div>
    )
}

export default IndexSolicitud
