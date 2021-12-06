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
import { ServicioTratamiento } from '../../service/ServicioTratamiento';

const IndexTratamiento = () => {

let emptyTratamiento = {
        idTratamiento: null,
        nombreTratamiento: '',
        estado: ''
    };

    const [tratamientos, setTratamientos] = useState(null);
    const [updateDialog, setUpdateDialog] = useState(false);
    const [listDialog, setListDialog] = useState(false);
    const [changeStateDialog, setchangeStateDialog] = useState(false);
    //editar o mostrar uno
    const [tratamiento, setTratamiento] = useState(emptyTratamiento);
    const [selectedTratamientos, setSelectedTratamientos] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const [estado, setEstado] = useState(true)
    const [pageState, setPageState] = useState(true)
    const servicioTratamiento = new ServicioTratamiento();

    let iconchangeState = `pi ${(pageState)?'pi-trash':'pi-check-circle'}`

    const getTratamientosHabilitados=()=>{
        const servicioTratamiento = new ServicioTratamiento();
        servicioTratamiento.getTratamiento().then(res => setTratamientos(res.data));
    }
    const getTratamientosDeshabilitados=()=>{
        const servicioTratamiento = new ServicioTratamiento();
        servicioTratamiento.getTratamientosDeshabilitados().then(res => setTratamientos(res.data));
    }

    //Obtener la data para llenar las tables
    useEffect(() => {
        setPageState(true)
        getTratamientosHabilitados()
    },[estado]);

    const listarTratamientosDeshabilitados = () =>{
        setPageState(false)
        getTratamientosDeshabilitados()
        //Mensaje de exito :D
        toast.current.show({ severity: 'success', summary: 'Cambio En La Consulta', detail: `Mostrando tratamientos deshabilitados`, life: 3000 });
    }

    const listarTratamientosHabilitados = () =>{
        setPageState(true)
        getTratamientosHabilitados()
        //Mensaje de exito :D
        toast.current.show({ severity: 'success', summary: 'Cambio En La Consulta', detail: `Mostrando tratamientos habilitados`, life: 3000 });
    }

    //Abrir el modal pero vacio, lo que significa que va a ser un nuevo registro
    const openNew = () => {
        //Aqui le establece el valor vacio por defecto
        setTratamiento(emptyTratamiento);
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
    const saveTratamiento = () => {
        setSubmitted(true);

            let _tratamientos = [tratamientos];
            //Esto verifica que el producto tenga un id para actualizarlo, si no es asi es un nuevo registo
            if (tratamiento.idTratamiento) {
                servicioTratamiento.updateTratamiento(tratamiento.idTratamiento, tratamiento).then(res=>{
                    //anuncio de exito :D
                    toast.current.show({ severity: 'success', summary: 'Exito', detail: `Tratamiento actualizado.`, life: 3000 });
                })
                setEstado(!estado)
            }
            else {
                servicioTratamiento.createTratamiento(tratamiento).then(res=>{
                    //Mensaje de exito :D
                    toast.current.show({ severity: 'success', summary: 'Exito', detail: `El registro ha sido creado con exito.`, life: 3000 });
                })
                setEstado(!estado)
            }

            setTratamientos(_tratamientos);
            //Esconde la alerta
            setUpdateDialog(false);
            //resetea el formulario
            setTratamiento(emptyTratamiento);
    }

    //accion que se realiza al darle click a el icono de editar, recibe un objeto dependiendo de la posicion de este en la tabla
    const editTratamiento = (tratamiento) => {
        //envia los datos de este objeto a la "plantilla"
        setTratamiento({ ...tratamiento });
        //muestra la ventana emergente de actualizacion de la pregunta
        setUpdateDialog(true);
    }
    const listTratamiento = (tratamiento) => {
        //envia los datos de este objeto a la "plantilla"
        setTratamiento({ ...tratamiento });
        //muestra la ventana emergente de actualizacion de la pregunta
        setListDialog(true);
    }

    //esta funcion muestra la ventana de "está seguro de borrar?"
    const confirmChangeState = (tratamiento) => {
        //de igual manera establece la "plantilla" para guardar el id del producto que va a borrar
        setTratamiento(tratamiento);
        //muestra la ventana de dialogo
        setchangeStateDialog(true);
    }

    //funcion para cambiar el estado
    const changeState = () => {
            servicioTratamiento.changeStateTratamiento(tratamiento.idTratamiento, pageState?'deshabilitar':'habilitar').then(res=>{
            //Mostrar mensaje de Proceso realizado exitosamente
            toast.current.show({ severity: 'warn', summary: 'Exito', detail: `Tratamiento ${pageState?'deshabilitado':'habilitado'}`, life: 3000 });
        })
        hidechangeStateDialog()
        pageState?getTratamientosHabilitados():getTratamientosDeshabilitados()
    }

    //esto es para exportar la info de la tabla a CSV... si se puede modificar, ni idea
    const exportCSV = () => {
        dt.current.exportCSV();
    }

    //Esto es para que el input funcione bien
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _tratamiento = { ...tratamiento };
        _tratamiento[`${name}`] = val;
        setTratamiento(_tratamiento);
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
                {rowData.nombreTratamiento}
            </>
        );
    }

    //corresponde a la columna de las acciones
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2 mb-1" onClick={() => editTratamiento(rowData)} />
                <Button icon="pi pi-eye" className="p-button-rounded p-button-info mr-2 mb-1" onClick={() => listTratamiento(rowData)} />
                <Button icon={iconchangeState} className="p-button-rounded p-button-warning" onClick={() => confirmChangeState(rowData)} />
            </div>

        );
    }

    //Parte Superior de la tabla, donde está el search, parece que el search solo setea un estado que se define antes...
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">
                Tratamientos {(pageState)?'habilitados':'Deshabilitados'}
            <Button onClick={(pageState)?listarTratamientosDeshabilitados:listarTratamientosHabilitados} style={{transform: 'rotate(90deg)'}} icon="pi pi-sort-alt" iconPos="right" tooltip={`Listar tratamientos ${(pageState)?'deshabilitados':'habilitados'}`} className="p-button-rounded p-button-secondary p-button-text"/>
            </h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    //La parte inferior de la ventana de dialogo de update/create, con dos botones: cancelar que lo cierra y guardar que genera el cambio
    const tratamientoDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveTratamiento} />
        </>
    );
    //La parte inferior de el dialog de borrado, lo mismo de antes y sus dos botones
    const deleteTratamientoDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hidechangeStateDialog} />
            <Button label="De acuerdo" icon="pi pi-check" className="p-button-text" onClick={changeState} />
        </>
    );

    //footer del mostrar los detalles de cada pregunta
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
                    <DataTable ref={dt} value={tratamientos} selection={selectedTratamientos} onSelectionChange={(e) => setSelectedTratamientos(e.value)}
                        dataKey="id" paginator rows={7} rowsPerPageOptions={[7, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Registros {first} a {last} de un total de {totalRecords}"
                        globalFilter={globalFilter} emptyMessage="No se encontro ningun registro." header={header}>
                        <Column field="nombreTratamiento" header="Nombre" sortable body={nombreBodyTemplate}></Column>
                        <Column header="Más" body={actionBodyTemplate} style={{ width: '70px' }}></Column>
                    </DataTable>


                    {/* Aqui va la ventana de editar/nuevo */}
                    <Dialog visible={updateDialog} style={{ width: '650px' }} header="Gestión Tratamiento" modal className="p-fluid" footer={tratamientoDialogFooter} onHide={hideDialog}>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="nombreTratamiento">Nombre: </label>
                                <InputText id="nombreTratamiento" value={tratamiento.nombreTratamiento} onChange={(e) => onInputChange(e, 'nombreTratamiento')} required autoFocus className={classNames({ 'p-invalid': submitted && !tratamiento.nombreTratamiento })} />
                                {submitted && !tratamiento.nombreTratamiento && <small className="p-invalid">Se requiere llenar los todos los campos vacios</small>}
                            </div>
                        </div>
                    </Dialog>


                    <Dialog visible={listDialog} style={{ width: '450px' }} header={`${tratamiento.nombreTratamiento}`} modal className="p-fluid" footer={footerList} onHide={hideDialog}>
                        <Card>
                            <p><strong>id: </strong>{tratamiento.idTratamiento}</p>
                            <p><strong>Nombre del tratamiento: </strong>{tratamiento.nombreTratamiento}</p>
                        </Card>
                    </Dialog>

                    <Dialog visible={changeStateDialog} style={{ width: '450px' }} header="¡Cuidado!" modal footer={deleteTratamientoDialogFooter} onHide={hidechangeStateDialog}>
                        <div className="flex align-items-center justify-content-center" style={{color:'var(--yellow-700)' }}>
                            <i className="pi pi-exclamation-triangle mr-3 " style={{ fontSize: '3rem' }} />
                            {tratamiento && <span>¿Está seguro de {(pageState)?'deshabilitar':'habilitar'} el tratamiento <b>{tratamiento.nombreTratamiento}</b>?</span>}
                        </div>
                    </Dialog>

                </div>
            </div>
        </div>
    )
}

export default IndexTratamiento
