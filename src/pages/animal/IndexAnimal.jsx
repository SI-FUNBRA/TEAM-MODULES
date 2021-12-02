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
import { ServicioAnimal } from '../../service/ServicioAnimal';
import SelectTratamiento from '../../components/selectTratamiento/selectTratamiento';
import SelectTipoAnimal from '../../components/selectTipoAnimal/selectTipoAnimal';
import SelectEnfermedad from '../../components/selectEnfermedad/SelectEnfermedad';
import { Dropdown } from 'primereact/dropdown';

const IndexAnimal = () => {
let today = new Date()

let emptyAnimal = {
    idAnimal: null,
    nombreAnimal: '',
    edad: '',
    genero: '',
    fechaLlegada: '',
    motivoLlegada: '',
    idEnfermedad_FK:'',
    idTratamiento_FK:'',
    estadoAnimal:'',
    fotografia: '',
    Enfermedad:{
        nombreEnfermedad:''
    },
    Tratamiento:{
        nombreTratamiento:''
    },
    TipoAnimal:{
        nombreTipoAnimal:''
    }
};

const [animales, setAnimales] = useState(null);
const [updateDialog, setUpdateDialog] = useState(false);
const [listDialog, setListDialog] = useState(false);
const [changeStateDialog, setchangeStateDialog] = useState(false);
//editar o mostrar uno nomas
const [animal, setAnimal] = useState(emptyAnimal);
const [selectedAnimales, setSelectedAnimales] = useState(null);
const [submitted, setSubmitted] = useState(false);
const [globalFilter, setGlobalFilter] = useState(null);
const toast = useRef(null);
const dt = useRef(null);

const [estado, setEstado] = useState(true)

const [pageState, setPageState] = useState(true)

const servicioAnimal = new ServicioAnimal();

const getAnimales=()=>{
    const servicioAnimal = new ServicioAnimal();
    servicioAnimal.getAnimales().then(res => setAnimales(res.data));
}
const getAnimalesAdoptados=()=>{
    const servicioAnimal = new ServicioAnimal();
    servicioAnimal.getAnimalesAdoptados().then(res => setAnimales(res.data));
}

//Obtener la data para llenar las tables
useEffect(() => {
    setPageState(true)
    getAnimales()
},[estado]);

const listarAnimalesAdoptados = () =>{
    setPageState(false)
    getAnimalesAdoptados()
    //Mensaje de exito :D
    toast.current.show({ severity: 'success', summary: 'Cambio En La Consulta', detail: `Mostrando animales adoptados`, life: 3000 });
}

const listarAnimales = () =>{
    setPageState(true)
    getAnimales()
    //Mensaje de exito :D
    toast.current.show({ severity: 'success', summary: 'Cambio En La Consulta', detail: `Mostrando animales en tratamiento`, life: 3000 });
}

//Abrir el modal pero vacio, lo que significa que va a ser un nuevo producto
const openNew = () => {
    //Aqui le establece el valor vacio por defecto
    setAnimal(emptyAnimal);
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
const saveAnimal = () => {
    setSubmitted(true);

        let _animales = [animales];
        //Esto verifica que el producto tenga un id para actualizarlo, si no es asi es un nuevo registo
        if (animal.idAnimal) {
            servicioAnimal.updateAnimal(animal.idAnimal, animal).then(res=>{
                //anuncio de exito :D
                toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: `Animal ${animal.nombreAnimal} Actualizado`, life: 3000 });
            })
            setEstado(!estado)
        }
        else {
            servicioAnimal.createUsuario(animal).then(res=>{
                //Mensaje de exito :D
                toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: `El animal ${animal.nombreAnimal} A sido Creado Con Exito`, life: 3000 });
            })
            setEstado(!estado)
        }

        setAnimales(_animales);
        //Escone la alerta
        setUpdateDialog(false);
        //resetea el formulario o mejor dicho el objeto
        setAnimal(emptyAnimal);

}

//accion que se realiza al darle click a el icono de editar, recibe un objeto y este objeto depende de la posision en la tabla
const editAnimal = (animal) => {
    //envia los datos de este objeto a la "plantilla"
    setAnimal({ ...animal });
    //muestra la ventana emerjente de actualizacion de producto
    setUpdateDialog(true);
}
const listAnimal = (animal) => {
    //envia los datos de este objeto a la "plantilla"
    setAnimal({ ...animal });
    //muestra la ventana emerjente de actualizacion de producto
    setListDialog(true);
}

//esta funcion muestra la ventana de "está seguro de borrar?"
const confirmChangeState = (animal) => {
    //de igual manera establece la "plantilla" para guardar el id del producto que va a borrar
    setAnimal(animal);
    //muestra la ventana de dialogo
    setchangeStateDialog(true);
}

//funcion para cambiar el estado de un usuario
const changeState = () => {
        servicioAnimal.changeStateAnimal(animal.idAnimal,pageState?'adocambiarEstadoAdoptadoptado':'cambiarEstadoEnTratamiento').then(res=>{

        //Mostrar mensaje de Proceso realizado full 4k esitoso
        toast.current.show({ severity: 'warn', summary: 'Todo Bien', detail: `Animal ${pageState?'Adoptado':'En tratamiento'}`, life: 3000 });
    })
    hidechangeStateDialog()
    pageState?getAnimales():getAnimalesAdoptados()
}
    //esto es para exportar la info de la tabla a CSV... si se puede modificar, ni idea
    const exportCSV = () => {
        dt.current.exportCSV();
    }

    //Esto es para que el imput funcione bien
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _animal = { ...animal };
        _animal[`${name}`] = val;
        setAnimal(_animal);
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
                {rowData.nombreAnimal}
            </>
        );
    }

    const edadBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Edad</span>
                {rowData.edad}
            </>
        );
    }

    const fechaLlegadaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Fecha de llegada</span>
                {rowData.fechaLlegada}
            </>
        );
    }

    const motivoLlegadaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Motivo de llegada</span>
                {rowData.motivoLlegada}
            </>
        );
    }

    const generoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Género</span>
                {rowData.genero}
            </>
        );
    }

    const enfermedadBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Enfermedad</span>
                {rowData.Enfermedad.nombreEnfermedad}
            </>
        );
    }

    const tratamientoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Tratamiento</span>
                {rowData.Tratamiento.nombreTratamiento}
            </>
        )
    }

    const tipoAnimalBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Tipo Animal</span>
                {rowData.TipoAnimal.nombreTipoAnimal}
            </>
        )
    }

    const fotografiaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Fotografía</span>
                {rowData.fotografia}
            </>
        )
    }



    //corresponde a la columna de las acciones
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2 mb-1" onClick={() => editAnimal(rowData)} />
                <Button icon="pi pi-eye" className="p-button-rounded p-button-info mr-2 mb-1" onClick={() => listAnimal(rowData)} />
                <Button icon="pi-check-circle" className="p-button-rounded p-button-warning" onClick={() => confirmChangeState(rowData)} />
            </div>

        );
    }

    //Parte Superior de la tabla, donde está el search, parece que el search solo setea un estado que se define antes...
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">
                Animales {(pageState)?'en tratamiento':'Adoptados'}
            <Button onClick={(pageState)? listarAnimalesAdoptados: listarAnimales} style={{transform: 'rotate(90deg)'}} icon="pi pi-sort-alt" iconPos="right" tooltip={`Listando animales ${(pageState) ? 'adoptados':'en tratamiento'}`} className="p-button-rounded p-button-secondary p-button-text"/>
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
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveAnimal} />
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
                    <DataTable ref={dt} value={animales} selection={selectedAnimales} onSelectionChange={(e) => setSelectedAnimales(e.value)}
                        dataKey="id" paginator rows={7} rowsPerPageOptions={[7, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Registros {first} a {last} de un total de {totalRecords}"
                        globalFilter={globalFilter} emptyMessage="No se encontro ningun registro." header={header}>
                        <Column body={fotografiaBodyTemplate}></Column>
                        <Column field="nombreAnimal" header="Nombre" sortable body={nombreBodyTemplate}></Column>
                        <Column field="edad" header="Edad" sortable body={edadBodyTemplate}></Column>
                        <Column field="fechaLlegada" header="Fecha de llegada" body={fechaLlegadaBodyTemplate} sortable></Column>
                        <Column field="motivoLlegada" header="Motivo de llegada" sortable body={motivoLlegadaBodyTemplate}></Column>
                        <Column field="genero" header="Género" sortable body={generoBodyTemplate}></Column>
                        <Column field="Enfermedad.nombreEnfermedad" header="Enfermedad" body={enfermedadBodyTemplate} sortable></Column>
                        <Column field="Tratamiento.nombreTratamiento" header="Tratamiento" body={tratamientoBodyTemplate} sortable></Column>
                        <Column field="TipoAnimal.nombreTipoAnimal" header="Tipo de animal" body={tipoAnimalBodyTemplate} sortable></Column>
                        <Column header="Más" body={actionBodyTemplate} style={{ width: '70px' }} ></Column>
                    </DataTable>
                    {/* Aqui va la ventana de editar/nuevo */}
                    <Dialog visible={updateDialog} style={{ width: '650px' }} header="Gestion Animal" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>

                    <form action="/upload" encType="multipart/form-data">
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="nombreAnimal">Nombre: </label>
                                <InputText id="nombreAnimal" value={animal.nombreAnimal} onChange={(e) => onInputChange(e, 'nombreAnimal')} required autoFocus className={classNames({ 'p-invalid': submitted && !animal.nombreAnimal })} />
                                {submitted && !animal.nombreAnimal && <small className="p-invalid">Se Requiere El Nombre</small>}
                            </div>
                            <div className="field col">
                                <label htmlFor="edad">Edad: </label>
                                <InputText id="edad" value={animal.edad} onChange={(e) => onInputChange(e, 'edad')} required className={classNames({ 'p-invalid': submitted && !animal.edad })} />
                                {submitted && !animal.edad && <small className="p-invalid">Se Requiere Llenar este campo</small>}
                            </div>
                        </div>


                        <div className="formgrid grid">
                            {!animal.idAnimal &&
                                <div className="field col">
                                    <label htmlFor="fechaLlegada">Fecha de llegada: </label>
                                    <Calendar yearRange={`${today.getFullYear()-90}:${today.getFullYear()-14}`} id="fechaLlegada" value={animal.fechaLlegada} onChange={(e) => onInputChange(e, 'fechaLlegada')}monthNavigator yearNavigator required className={classNames({ 'p-invalid': submitted && !animal.fechaLlegada })}
                                    monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate}/>
                                    {submitted && !animal.fechaLlegada && <small className="p-invalid">Se Requiere Seleccionar Una Fecha</small>}
                                </div>
                            }
                            <div className="field col">
                                <label>Motivo de Llegada</label>
                                <Dropdown value={animal.motivoLlegada} options={'abandono, enfermedad, condición de calle'} onChange={(e) => onInputChange(e, 'motivoLlegada')}/>
                            </div>

                        </div>

                        <div className="field">
                            <label htmlFor="genero">Correo</label>
                            <Dropdown id="genero" value={animal.genero} onChange={(e) => onInputChange(e, 'genero')} required className={classNames({ 'p-invalid': submitted && !animal.genero })} />
                            {submitted && !animal.genero && <small className="p-invalid">Se requiere seleccionar una opción</small>}
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="tipoAnimal"> Tipo de animal</label>
                                <SelectTipoAnimal idTratamiento={animal.idTipoAnimal_FK} onInputChange={onInputChange}/>
                            </div>
                            <div className="field col">
                                <label htmlFor="enfermedad">Enfermedad</label>
                                <SelectEnfermedad idEnfermedad={animal.idEnfermedad_FK} onInputChange={onInputChange}/>
                            </div>
                            <div className="field col">
                                <label htmlFor="tratamiento">Tratamiento</label>
                                <SelectTratamiento idTratamiento={animal.idTratamiento_FK} onInputChange={onInputChange}/>
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="fotografia">Fotografía</label>
                                <FileUpload value={animal.fotografia} onInputChange={onInputChange}/>
                            </div>
                        </div>
                        </form>
                    </Dialog>

                    <Dialog visible={listDialog} style={{ width: '450px' }} header={`${animal.nombreAnimal}`} modal className="p-fluid" footer={footerList} onHide={hideDialog}>
                        <Card>
                            <p><strong>edad: </strong>{animal.edad}</p>
                            <p><strong>genero: </strong>{animal.genero}</p>
                            <p><strong>motivo de llegada: </strong>{animal.motivoLlegada}</p>
                            <p><strong>fecha de llegada: </strong>{animal.motivoLlegada}</p>
                            <p><strong>Enfermedad: </strong>{animal.Enfermedad.nombreEnfermedad}</p>
                            <p><strong>Tratamiento: </strong>{animal.Tratamiento.nombreTratamiento}</p>
                            <p><strong>Tipo de animal: </strong>{animal.TipoAnimal.nombreTipoAnimal}</p>
                            <p><strong>Estado: </strong>{animal.estadoAnimal}</p>
                            <p><strong>Fotografia: </strong>{animal.fotografia}</p>
                        </Card>
                    </Dialog>

                    <Dialog visible={changeStateDialog} style={{ width: '450px' }} header="¡Cuidado!" modal footer={deleteProductDialogFooter} onHide={hidechangeStateDialog}>
                        <div className="flex align-items-center justify-content-center" style={{color:'var(--yellow-700)' }}>
                            <i className="pi pi-exclamation-triangle mr-3 " style={{ fontSize: '3rem' }} />
                            {animal && <span>¿Está seguro de cambiar el estado de <b>{animal.nombreAnimal}</b>?</span>}
                        </div>
                    </Dialog>

                </div>
            </div>
        </div>
    )
}

export default IndexAnimal
