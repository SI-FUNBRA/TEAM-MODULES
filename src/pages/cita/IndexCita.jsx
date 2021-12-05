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
import  {ServicioCita}  from '../../service/ServicioCita';

const IndexCita = () => {

let emptyProduct = {
        idCita: null,
        fechaCita:'',
        motivoCita:''

    };

    const [citas, setCitas] = useState(null);
    const [updateDialog, setUpdateDialog] = useState(false);
    const [listDialog, setListDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    //editar o mostrar uno nomas
    const [cita, setCita] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const servicioCita = new ServicioCita();



    //Obtener la data para llenar las tables

    useEffect(() => {
        const servicioCita = new ServicioCita();
        servicioCita.getCita().then(res => setCitas(res.data));
    }, []);


    //Abrir el modal pero vacio, lo que significa que va a ser un nuevo producto
    const openNew = () => {
        //Aqui le establece el valor vacio por defecto
        setCita(emptyProduct);
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

            let _citas = [...citas];
            //Esto verifica que el producto tenga un id para actualizarlo, si no es asi es un nuevo registo
            if (cita.idCita) {
                servicioCita.updateCita(cita.idCita,cita).then(res=>{
                    //anuncio de exito :D
                    toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: `Cita Actualizada`, life: 3000 });
                })
            }
            else {
                servicioCita.createCita(cita).then(res=>{
                    //Mensaje de exito :D
                    toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: `Cita A sido Creado Con Exito`, life: 3000 });
                })
            }

            setCitas(_citas);
            //Escone la alerta
            setUpdateDialog(false);
            //resetea el formulario o mejor dicho el objeto
            setCita(emptyProduct);

    }

    //accion que se realiza al darle click a el icono de editar, recibe un objeto y este objeto depende de la posision en la tabla
    const editCita = (cita) => {
        //envia los datos de este objeto a la "plantilla"
        setCita({ ...cita });
        //muestra la ventana emerjente de actualizacion de producto
        setUpdateDialog(true);
    }
    const listCita = (cita) => {
        //envia los datos de este objeto a la "plantilla"
        setCita({ ...cita });
        //muestra la ventana emerjente de actualizacion de producto
        setListDialog(true);
    }

    //esta funcion muestra la ventana de "está seguro de borrar?"
    const confirmDeleteProduct = (product) => {
        //de igual manera establece la "plantilla" para guardar el id del producto que va a borrar
        setCita(product);
        //muestra la ventana de dialogo
        setDeleteProductDialog(true);
    }

    //funcion para cambiar el estado de un usuario
    const deleteProduct = () => {
        //simplemente borra como si fuera un arreglo
        //no poner mucho cuidado!!
        let _citas = citas.filter(val => val.idCita !== cita.idCita);
        setCitas(_citas);
        //Oculta el mensaje de borrar
        setDeleteProductDialog(false);
        //resetea el formulario o mejor dicho el objeto
        setCita(emptyProduct);
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
        let _cita = { ...cita };
        _cita[`${name}`] = val;
        setCita(_cita);
    }

    //Codigo de las acciones de la tabla
    const leftToolbarTemplate = () => {
        return (
            //retorna un fragmento de codigo con botones, parte superior izquierda
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nueva Cita" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
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

    const fechaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Fecha Cita</span>
                {rowData.fechaCita}
            </>
        );
    }

    const motivoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Motivo Cita</span>
                {rowData.motivoCita}
            </>
        );
    }


    //corresponde a la columna de las acciones
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2 mb-1" onClick={() => editCita(rowData)} />
                <Button icon="pi pi-eye" className="p-button-rounded p-button-info mr-2 mb-1" onClick={() => listCita(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </div>

        );
    }

    //Parte Superior de la tabla, donde está el search, parece que el search solo setea un estado que se define antes...
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Citas</h5>
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
                    <DataTable ref={dt} value={citas} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id" paginator rows={7} rowsPerPageOptions={[7, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Registros {first} a {last} de un total de {totalRecords}"
                        globalFilter={globalFilter} emptyMessage="No se encontro ningun registro." header={header}>
                        <Column field="fechaCita" header="Fecha Cita" sortable body={fechaBodyTemplate}></Column>
                        <Column field="motivoCita" header="Motivo Cita" sortable body={motivoBodyTemplate}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>
                    {/* Aqui va la ventana de editar/nuevo */}
                    <Dialog visible={updateDialog} style={{ width: '650px' }} header="Gestion Cita" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>

                        {/* Agregar la ruta de imagen a la api */}


                        <div className="formgrid grid">
                            {!cita.idCita &&
                                <div className="field col">
                                <label htmlFor="fechaCita">Fecha Cita</label>
                                <InputText id="fechaCita" value={cita.fechaCita} onChange={(e) => onInputChange(e, 'fechaCita')} required className={classNames({ 'p-invalid': submitted && !cita.fechaCita })} />
                                {submitted && !cita.fechaCita && <small className="p-invalid">Se Requiere la fecha</small>}
                            </div>
                            }
                              <div className="field col">
                                <label htmlFor="motivoCita">Motivo Cita</label>
                                <InputText id="motivoCita" value={cita.motivoCita} onChange={(e) => onInputChange(e, 'motivoCita')} required className={classNames({ 'p-invalid': submitted && !cita.motivoCita })} />
                                {submitted && !cita.motivoCita && <small className="p-invalid">Se Requiere el motivo</small>}
                            </div>
                        </div>
                    </Dialog>

                    <Dialog visible={listDialog} style={{ width: '450px' }} header={`${cita.fechaCita} ${cita.motivoCita}`} modal className="p-fluid" footer={footerList} onHide={hideDialog}>
                        <Card>
                            <p><strong>Fecha Cita:</strong>{cita.fechaCita}</p>
                            <p><strong>Motivo Cita:</strong>{cita.motivoCita}</p>
                        </Card>
                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Cuidao!" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {cita && <span>Esta seguro de borrar: <b>{cita.motivoCita}</b>?</span>}
                        </div>
                    </Dialog>

                </div>
            </div>
        </div>
    )
}

export default IndexCita
