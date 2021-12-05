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
import  {ServicioSede}  from '../../service/ServicioSede';

const IndexSede = () => {

let emptyProduct = {
        idSede: null,
        nombreSede:'',
        telefonoSede:'',
        correoSede:'',
        Nomenclatura:''

    };

    const [sedes, setSedes] = useState(null);
    const [updateDialog, setUpdateDialog] = useState(false);
    const [listDialog, setListDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    //editar o mostrar uno nomas
    const [sede, setSede] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const servicioSede = new ServicioSede();



    //Obtener la data para llenar las tables

    useEffect(() => {
        const servicioSede = new ServicioSede();
        servicioSede.getSede().then(res => setSedes(res.data));
    }, []);


    //Abrir el modal pero vacio, lo que significa que va a ser un nuevo producto
    const openNew = () => {
        //Aqui le establece el valor vacio por defecto
        setSede(emptyProduct);
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
    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    //accion para guardar un registro
    const saveProduct = () => {
        setSubmitted(true);

            let _sedes = [...sedes];
            //Esto verifica que el producto tenga un id para actualizarlo, si no es asi es un nuevo registo
            if (sede.idSede) {
                servicioSede.updateSede(sede.idSede,sede).then(res=>{
                    //anuncio de exito :D
                    toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: `Sede Actualizado`, life: 3000 });
                })
            }
            else {
                servicioSede.createSede(sede).then(res=>{
                    //Mensaje de exito :D
                    toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: `Sede A sido Creado Con Exito`, life: 3000 });
                })
            }

            setSedes(_sedes);
            //Escone la alerta
            setUpdateDialog(false);
            //resetea el formulario o mejor dicho el objeto
            setSede(emptyProduct);

    }

    //accion que se realiza al darle click a el icono de editar, recibe un objeto y este objeto depende de la posision en la tabla
    const editSede = (sede) => {
        //envia los datos de este objeto a la "plantilla"
        setSede({ ...sede });
        //muestra la ventana emerjente de actualizacion de producto
        setUpdateDialog(true);
    }
    const listSede = (sede) => {
        //envia los datos de este objeto a la "plantilla"
        setSede({ ...sede });
        //muestra la ventana emerjente de actualizacion de producto
        setListDialog(true);
    }

    //esta funcion muestra la ventana de "está seguro de borrar?"
    const confirmDeleteProduct = (product) => {
        //de igual manera establece la "plantilla" para guardar el id del producto que va a borrar
        setSede(product);
        //muestra la ventana de dialogo
        setDeleteProductDialog(true);
    }

    //funcion para cambiar el estado de un usuario
    const deleteProduct = () => {
        //simplemente borra como si fuera un arreglo
        //no poner mucho cuidado!!
        let _sedes = sedes.filter(val => val.idSede !== sede.idSede);
        setSedes(_sedes);
        //Oculta el mensaje de borrar
        setDeleteProductDialog(false);
        //resetea el formulario o mejor dicho el objeto
        setSede(emptyProduct);
        //Mostrar mensaje de Proceso realizado full 4k esitoso
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    }

    //esto es para exportar la info de la tabla a CSV... si se puede modificar, ni idea
    const exportCSV = () => {
        dt.current.exportCSV();
    }

    //Esto es para que el imput funcione bien
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _sede = { ...sede };
        _sede[`${name}`] = val;
        setSede(_sede);
    }

    //Codigo de las acciones de la tabla
    const leftToolbarTemplate = () => {
        return (
            //retorna un fragmento de codigo con botones, parte superior izquierda
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nueva Sede" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
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
                <span className="p-column-title">Nombre Sede</span>
                {rowData.nombreSede}
            </>
        );
    }

    const telefonoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Telefono Sede</span>
                {rowData.telefonoSede}
            </>
        );
    }

    const correoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Correo Sede</span>
                {rowData.correoSede}
            </>
        );
    }

    const nomenclaturaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nomenclatura</span>
                {rowData.Nomenclatura}
            </>
        );
    }





    //corresponde a la columna de las acciones
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2 mb-1" onClick={() => editSede(rowData)} />
                <Button icon="pi pi-eye" className="p-button-rounded p-button-info mr-2 mb-1" onClick={() => listSede(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </div>

        );
    }

    //Parte Superior de la tabla, donde está el search, parece que el search solo setea un estado que se define antes...
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Sedes</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    //La parte inferior de la ventana de dialogo de update/create, con dos botones: cancelar que lo cierra y guardar que genra el cambio
    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </>
    );
    //La parte inferior de el dialog de borrado, lo mismo de antes y sus dos botones
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </>
    );



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
                    <DataTable ref={dt} value={sedes} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id" paginator rows={7} rowsPerPageOptions={[7, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Registros {first} a {last} de un total de {totalRecords}"
                        globalFilter={globalFilter} emptyMessage="No se encontro ningun registro." header={header}>
                        <Column field="nombreSede" header="Nombre Sede" sortable body={nombreBodyTemplate}></Column>
                        <Column field="telefonoSede" header="Telefono Sede" sortable body={telefonoBodyTemplate}></Column>
                        <Column field="correoSede" header="Correo Sede" sortable body={correoBodyTemplate}></Column>
                        <Column field="Nomenclatura" header="Nomenclatura" sortable body={nomenclaturaBodyTemplate}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>
                    {/* Aqui va la ventana de editar/nuevo */}
                    <Dialog visible={updateDialog} style={{ width: '650px' }} header="Gestion Cita" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>

                        {/* Agregar la ruta de imagen a la api */}


                        <div className="formgrid grid">
                            {!sede.idSede &&
                                <div className="field col">
                                <label htmlFor="nombreSede">Nombre Sede</label>
                                <InputText id="nombreSede" value={sede.nombreSede} onChange={(e) => onInputChange(e, 'nombreSede')} required className={classNames({ 'p-invalid': submitted && !sede.nombreSede })} />
                                {submitted && !sede.nombreSede && <small className="p-invalid">Se Requiere El Nombre de la Sede</small>}
                            </div>
                            }
                              <div className="field col">
                                <label htmlFor="correoSede">Correo Sede</label>
                                <InputText id="correoSede" value={sede.correoSede} onChange={(e) => onInputChange(e, 'correoSede')} required className={classNames({ 'p-invalid': submitted && !sede.correoSede })} />
                                {submitted && !sede.correoSede && <small className="p-invalid">Se Requiere El Correo</small>}
                            </div>
                            <div className="field col">
                                <label htmlFor="telefonoSede">Telefono Sede</label>
                                <InputText id="telefonoSede" value={sede.telefonoSede} onChange={(e) => onInputChange(e, 'telefonoSede')} required className={classNames({ 'p-invalid': submitted && !sede.telefonoSede })} />
                                {submitted && !sede.telefonoSede && <small className="p-invalid">Se Requiere El Telefono</small>}
                            </div>
                            <div className="field col">
                                <label htmlFor="Nomenclatura">Nomenclatura</label>
                                <InputText id="Nomenclatura" value={sede.Nomenclatura} onChange={(e) => onInputChange(e, 'Nomenclatura')} required className={classNames({ 'p-invalid': submitted && !sede.Nomenclatura })} />
                                {submitted && !sede.Nomenclatura && <small className="p-invalid">Se Requiere La Nomenclatura</small>}
                            </div>
                        </div>

                    </Dialog>

                    <Dialog visible={listDialog} style={{ width: '450px' }} header={`${sede.nombreSede} ${sede.correoSede} ${sede.telefonoSede} ${sede.Nomenclatura}`} modal className="p-fluid" footer={footerList} onHide={hideDialog}>
                        <Card>
                            <p><strong>Nombre Sede:</strong>{sede.nombreSede}</p>
                            <p><strong>Correo Sede:</strong>{sede.correoSede}</p>
                            <p><strong>Telefono Sede:</strong>{sede.telefonoSede}</p>
                            <p><strong>Nomenclatura:</strong>{sede.Nomenclatura}</p>
                        </Card>
                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Cuidao!" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {sede && <span>Are you sure you want to delete <b>{sede.nombreSede}</b>?</span>}
                        </div>
                    </Dialog>

                </div>
            </div>
        </div>
    )
}

export default IndexSede
