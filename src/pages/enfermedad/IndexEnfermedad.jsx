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
import { ServicioEnfermedad } from '../../service/ServicioEnfermedad';

const IndexEnfermedad = () => {

let emptyEnfermedad = {
        idEnfermedad: null,
        nombreEnfermedad: '',
    };

    const [enfermedades, setEnfermedades] = useState(null);
    const [updateDialog, setUpdateDialog] = useState(false);
    const [listDialog, setListDialog] = useState(false);
    const [changeStateDialog, setchangeStateDialog] = useState(false);
    //editar o mostrar uno o mas registros
    const [enfermedad, setEnfermedad] = useState(emptyEnfermedad);
    const [selectedEnfermedades, setSelectedEnfermedades] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const [estado, setEstado] = useState(true)

    const [pageState, setPageState] = useState(true)

    const servicioEnfermedad = new ServicioEnfermedad();

    let iconchangeState = `pi ${(pageState)?'pi-trash':'pi-check-circle'}`

    const getEnfermedades=()=>{
        const servicioEnfermedad = new ServicioEnfermedad();
        servicioEnfermedad.getEnfermedad().then(res => setEnfermedades(res.data));
    }

    //Obtener la data para llenar las tables
    useEffect(() => {
        setPageState(true)
        getEnfermedades()
    },[estado]);

    const listarEnfermedades= () =>{
        setPageState(true)
        getEnfermedades()
        //Mensaje de exito :D
        toast.current.show({ severity: 'success', summary: 'Cambio En La Consulta', detail: `Mostrando Enfermedades`, life: 3000 });
    }

    //Abrir el modal pero vacio, lo que significa que va a ser un nuevo tipo
    const openNew = () => {
        //Aqui le establece el valor vacio por defecto
        setEnfermedad(emptyEnfermedad);
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
    const saveEnfermedad = () => {
        setSubmitted(true);

            let _enfermedades = [...enfermedades];
            //Esto verifica que el producto tenga un id para actualizarlo, si no es asi es un nuevo registo
            if (enfermedad.idEnfermedad) {
                servicioEnfermedad.updateEnfermedad(enfermedad.idEnfermedad, enfermedad).then(res=>{
                    //anuncio de exito :D
                    toast.current.show({ severity: 'success', summary: '¡Acción Exitosa!', detail: `Registro "${enfermedad.idEnfermedad}" Actualizado`, life: 3000 });
                })
                setEstado(!estado)
            }
            else {
                servicioEnfermedad.createEnfermerdad(enfermedad).then(res=>{
                    //Mensaje de exito :D
                    toast.current.show({ severity: 'success', summary: '¡Acción Exitosa!', detail: `El registro ha sido creada con exito`, life: 3000 });
                })
                setEstado(!estado)
            }

            setEnfermedades(_enfermedades);
            //Escone la alerta
            setUpdateDialog(false);
            //resetea el formulario o mejor dicho el objeto
            setEnfermedad(emptyEnfermedad);

    }

    //accion que se realiza al darle click a el icono de editar, recibe un objeto y este objeto depende de la posision en la tabla
    const editEnfermedad = (enfermedad) => {
        //envia los datos de este objeto a la "plantilla"
        setEnfermedad({ ...enfermedad });
        console.log({...enfermedad})
        //muestra la ventana emergente de actualizacion
        setUpdateDialog(true);
    }
    const listEnfermedad = (enfermedad) => {
        //envia los datos de este objeto a la "plantilla"
        setEnfermedad({ ...enfermedad });
        //muestra la ventana emergente de actualizacion
        setListDialog(true);
    }

    //esta funcion muestra la ventana de "está seguro de borrar?"
    const confirmChangeState = (enfermedad) => {
        //de igual manera establece la "plantilla" para guardar el id del producto que va a borrar
        setEnfermedad(enfermedad);
        //muestra la ventana de dialogo
        setchangeStateDialog(true);
    }

    //funcion para cambiar el estado de un usuario
    const deleteEnfermedad = () => {
            servicioEnfermedad.deleteEnfermedad(enfermedad.idEnfermedad).then(res=>{
            //Mostrar mensaje de Proceso realizado
            toast.current.show({ severity: 'warn', summary: '¡Acción Exitosa!', detail: `Registro eliminado exitosamente`, life: 3000 });
        })
        hidechangeStateDialog();
        getEnfermedades();
    }

    //esto es para exportar la info de la tabla a CSV... si se puede modificar, ni idea
    const exportCSV = () => {
        dt.current.exportCSV();
    }

    //Esto es para que el input funcione bien
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _enfermedad = { ...enfermedad };
        _enfermedad[`${name}`] = val;
        setEnfermedad(_enfermedad);
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

    const nombreEnfermedadBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nombre de la enfermedad</span>
                {rowData.nombreEnfermedad}
            </>
        );
    }



    //corresponde a la columna de las acciones
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2 mb-1" onClick={() => editEnfermedad(rowData)} />
                <Button icon="pi pi-eye" className="p-button-rounded p-button-info mr-2 mb-1" onClick={() => listEnfermedad(rowData)} />
                <Button icon={iconchangeState} className="p-button-rounded p-button-warning" onClick={() => confirmChangeState(rowData)} />
            </div>

        );
    }

    //Parte Superior de la tabla, donde está el search, parece que el search solo setea un estado que se define antes...
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">
                Enfermedades
            <Button onClick={listarEnfermedades} style={{transform: 'rotate(90deg)'}} icon="pi pi-sort-alt" iconPos="right" tooltip={`Listar Enfermedades`} className="p-button-rounded p-button-secondary p-button-text"/>
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
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveEnfermedad} />
        </>
    );
    //La parte inferior de el dialog de borrado, lo mismo de antes y sus dos botones
    const deleteTipoDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hidechangeStateDialog} />
            <Button label="De acuerdo" icon="pi pi-check" className="p-button-text" onClick={deleteEnfermedad} />
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
                    <DataTable ref={dt} value={enfermedades} selection={selectedEnfermedades} onSelectionChange={(e) => setSelectedEnfermedades(e.value)}
                        dataKey="id" paginator rows={7} rowsPerPageOptions={[7, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Registros {first} a {last} de un total de {totalRecords}"
                        globalFilter={globalFilter} emptyMessage="No se encontro ningun registro." header={header}>
                        <Column field="nombreEnfermedad" header="Nombre de la enfermedad" sortable body={nombreEnfermedadBodyTemplate}></Column>
                        <Column header="Más" body={actionBodyTemplate} style={{ width: '70px' }} ></Column>
                    </DataTable>
                    {/* Aqui va la ventana de editar/nuevo */}
                    <Dialog visible={updateDialog} style={{ width: '650px' }} header="Gestión Enfermedades" modal className="p-fluid" footer={TiposDialogFooter} onHide={hideDialog}>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="nombre">Enfermedad</label>
                                <InputText id="nombre" value={enfermedad.nombreEnfermedad} onChange={(e) => onInputChange(e, 'nombreEnfermedad')} required autoFocus className={classNames({ 'p-invalid': submitted && !enfermedad.nombreEnfermedad })} />
                                {submitted && !enfermedad.nombreEnfermedad && <small className="p-invalid">Se Requiere Llenar los campos vacíos</small>}
                            </div>
                        </div>
                    </Dialog>

                    <Dialog visible={listDialog} style={{ width: '450px' }} header={`Enfermedad ${enfermedad.nombreEnfermedad}`} modal className="p-fluid" footer={footerList} onHide={hideDialog}>
                        <Card>
                            <p><strong>Id: </strong>{enfermedad.idEnfermedad}</p>
                            <p><strong>Nombre: </strong>{enfermedad.nombreEnfermedad}</p>
                        </Card>
                    </Dialog>

                    <Dialog visible={changeStateDialog} style={{ width: '450px' }} header="¡Cuidado!" modal footer={deleteTipoDialogFooter} onHide={hidechangeStateDialog}>
                        <div className="flex align-items-center justify-content-center" style={{color:'var(--yellow-700)' }}>
                            <i className="pi pi-exclamation-triangle mr-3 " style={{ fontSize: '3rem' }} />
                            {<span>¿Está seguro de eliminar el registro <b>{enfermedad.idEnfermedad}</b>?</span>}
                        </div>
                    </Dialog>

                </div>
            </div>
        </div>
    )
}

export default IndexEnfermedad
