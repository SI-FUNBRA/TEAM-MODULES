import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { ServicioTipoAnimal } from '../../service/ServicioTipoAnimal';

const IndexTipoAnimal = () => {

let emptyTipoAnimal = {
        idTipoAnimal: null,
        nombreTipoAnimal: '',
    };

    const [tiposAnimal, setTiposAnimal] = useState(null);
    const [updateDialog, setUpdateDialog] = useState(false);
    const [listDialog, setListDialog] = useState(false);
    const [changeStateDialog, setchangeStateDialog] = useState(false);
    //editar o mostrar uno o mas registros
    const [tipoAnimal, setTipoAnimal] = useState(emptyTipoAnimal);
    const [selectedTiposAnimal, setSelectedTiposAnimal] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const [estado, setEstado] = useState(true)

    const [pageState, setPageState] = useState(true)

    const servicioTipoAnimal = new ServicioTipoAnimal();

    let iconchangeState = `pi ${(pageState)?'pi-trash':'pi-check-circle'}`

    const getTiposAnimal=()=>{

        const servicioTipoAnimal = new ServicioTipoAnimal();
        servicioTipoAnimal.getTipoAnimal().then(res => setTiposAnimal(res.data));
    }

    //Obtener la data para llenar las tables
    useEffect(() => {
        setPageState(true)
        getTiposAnimal()
    },[estado]);

    const listarTiposAnimal= () =>{
        setPageState(true)
        getTiposAnimal()
        //Mensaje de exito :D
        toast.current.show({ severity: 'success', summary: 'Cambio En La Consulta', detail: `Mostrando Tipos De Animal`, life: 3000 });
    }

    //Abrir el modal pero vacio, lo que significa que va a ser un nuevo tipo
    const openNew = () => {
        //Aqui le establece el valor vacio por defecto
        setTipoAnimal(emptyTipoAnimal);
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
    const saveTipoAnimal = () => {
        setSubmitted(true);

            let _tiposAnimal = [...tiposAnimal];
            //Esto verifica que el producto tenga un id para actualizarlo, si no es asi es un nuevo registo
            if (tipoAnimal.idTipoAnimal) {
                servicioTipoAnimal.updateTipoAnimal(tipoAnimal.idTipoAnimal, tipoAnimal).then(res=>{
                    //anuncio de exito :D
                    toast.current.show({ severity: 'success', summary: '¡Acción Exitosa!', detail: `Tipo Animal "${tipoAnimal.nombreTipoAnimal}" Actualizado`, life: 3000 });
                })
                setEstado(!estado)
            }
            else {
                servicioTipoAnimal.createTipoAnimal(tipoAnimal).then(res=>{
                    //Mensaje de exito :D
                    toast.current.show({ severity: 'success', summary: '¡Acción Exitosa!', detail: `El registro ha sido creada con exito`, life: 3000 });
                })
                setEstado(!estado)
            }

            setTiposAnimal(_tiposAnimal);
            //Escone la alerta
            setUpdateDialog(false);
            //resetea el formulario o mejor dicho el objeto
            setTipoAnimal(emptyTipoAnimal);

    }

    //accion que se realiza al darle click a el icono de editar, recibe un objeto y este objeto depende de la posision en la tabla
    const editTipoAnimal = (tipoAnimal) => {
        //envia los datos de este objeto a la "plantilla"
        setTipoAnimal({ ...tipoAnimal });
        console.log({...tipoAnimal})
        //muestra la ventana emergente de actualizacion
        setUpdateDialog(true);
    }
    const listTipoAnimal = (tipoAnimal) => {
        //envia los datos de este objeto a la "plantilla"
        setTipoAnimal({ ...tipoAnimal });
        //muestra la ventana emergente de actualizacion
        setListDialog(true);
    }

    //esta funcion muestra la ventana de "está seguro de borrar?"
    const confirmChangeState = (tipoAnimal) => {
        //de igual manera establece la "plantilla" para guardar el id del producto que va a borrar
        setTipoAnimal(tipoAnimal);
        //muestra la ventana de dialogo
        setchangeStateDialog(true);
    }

    //funcion para cambiar el estado de un usuario
    const deleteTipoAnimal = () => {
            servicioTipoAnimal.deleteTipoAnimal(tipoAnimal.idTipoAnimal).then(res=>{
            //Mostrar mensaje de Proceso realizado full 4k exitoso
            toast.current.show({ severity: 'warn', summary: '¡Acción Exitosa!', detail: `Registro eliminado exitosamente`, life: 3000 });
        })
        hidechangeStateDialog();
        getTiposAnimal();
    }

    //esto es para exportar la info de la tabla a CSV... si se puede modificar, ni idea
    const exportCSV = () => {
        dt.current.exportCSV();
    }

    //Esto es para que el input funcione bien
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _tipoAnimal = { ...tipoAnimal };
        _tipoAnimal[`${name}`] = val;
        setTipoAnimal(_tipoAnimal);
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

    const nombreTipoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nombre del Tipo de Animal</span>
                {rowData.nombreTipoAnimal}
            </>
        );
    }



    //corresponde a la columna de las acciones
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2 mb-1" onClick={() => editTipoAnimal(rowData)} />
                <Button icon="pi pi-eye" className="p-button-rounded p-button-info mr-2 mb-1" onClick={() => listTipoAnimal(rowData)} />
                <Button icon={iconchangeState} className="p-button-rounded p-button-warning" onClick={() => confirmChangeState(rowData)} />
            </div>

        );
    }

    //Parte Superior de la tabla, donde está el search, parece que el search solo setea un estado que se define antes...
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">
                Tipos de animal
            <Button onClick={listarTiposAnimal} style={{transform: 'rotate(90deg)'}} icon="pi pi-sort-alt" iconPos="right" tooltip={`Listar Tipos de Animal`} className="p-button-rounded p-button-secondary p-button-text"/>
            </h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    //La parte inferior de la ventana de dialogo de update/create, con dos botones: cancelar que lo cierra y guardar que genra el cambio
    const TiposDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveTipoAnimal} />
        </>
    );
    //La parte inferior de el dialog de borrado, lo mismo de antes y sus dos botones
    const deleteTipoDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hidechangeStateDialog} />
            <Button label="De acuerdo" icon="pi pi-check" className="p-button-text" onClick={deleteTipoAnimal} />
        </>
    );

    //footer del mostrar Respuesta por individual
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
                    <DataTable ref={dt} value={tiposAnimal} selection={selectedTiposAnimal} onSelectionChange={(e) => setSelectedTiposAnimal(e.value)}
                        dataKey="id" paginator rows={7} rowsPerPageOptions={[7, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Registros {first} a {last} de un total de {totalRecords}"
                        globalFilter={globalFilter} emptyMessage="No se encontro ningun registro." header={header}>
                        <Column field="nombreTipoAnimal" header="Nombre del tipo de animal" sortable body={nombreTipoBodyTemplate}></Column>
                        <Column header="Más" body={actionBodyTemplate} style={{ width: '70px' }} ></Column>
                    </DataTable>
                    {/* Aqui va la ventana de editar/nuevo */}
                    <Dialog visible={updateDialog} style={{ width: '650px' }} header="Gestión Tipos de Animales" modal className="p-fluid" footer={TiposDialogFooter} onHide={hideDialog}>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="nombre">Nombre: </label>
                                <InputText id="nombre" value={tipoAnimal.nombreTipoAnimal} onChange={(e) => onInputChange(e, 'nombreTipoAnimal')} required autoFocus className={classNames({ 'p-invalid': submitted && !tipoAnimal.nombreTipoAnimal })} />
                                {submitted && !tipoAnimal.nombreTipoAnimal && <small className="p-invalid">Se Requiere Llenar los campos vacíos</small>}
                            </div>
                        </div>
                    </Dialog>

                    <Dialog visible={listDialog} style={{ width: '450px' }} header={`Tipo de animal ${tipoAnimal.nombreTipoAnimal}`} modal className="p-fluid" footer={footerList} onHide={hideDialog}>
                        <Card>
                            <p><strong>Nombre: </strong>{tipoAnimal.nombreTipoAnimal}</p>
                        </Card>
                    </Dialog>

                    <Dialog visible={changeStateDialog} style={{ width: '450px' }} header="¡Cuidado!" modal footer={deleteTipoDialogFooter} onHide={hidechangeStateDialog}>
                        <div className="flex align-items-center justify-content-center" style={{color:'var(--yellow-700)' }}>
                            <i className="pi pi-exclamation-triangle mr-3 " style={{ fontSize: '3rem' }} />
                            {<span>¿Está seguro de eliminar el registro <b>{tipoAnimal.idTipoAnimal}</b>?</span>}
                        </div>
                    </Dialog>

                </div>
            </div>
        </div>
    )
}

export default IndexTipoAnimal
