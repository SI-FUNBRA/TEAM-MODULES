import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Row } from 'primereact/row';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { ServicioTipoDoc } from '../../../service/ServicioTipoDoc';
import { useFormik } from 'formik';

import { FaUserAlt } from "react-icons/fa";
const TipoUsuario = () => {

    let emptyItem = {
        idRol: "",
        nombreTipoDoc: '',
    };

    const [Items, setItems] = useState(null);
    const [updateDialog, setUpdateDialog] = useState(false);
    const [changeStateDialog, setchangeStateDialog] = useState(false);
    //editar o mostrar uno nomas
    const [Item, setItem] = useState(emptyItem);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const [estado, setEstado] = useState(true)

    const [pageState, setPageState] = useState(true)

    const servicioTipoDoc = new ServicioTipoDoc();

    let iconchangeState = `pi ${(pageState)?'pi-trash':'pi-check-circle'}`

    //Obtener la data para llenar las tables
    useEffect(() => {
        const servicioTipoDoc = new ServicioTipoDoc();
        servicioTipoDoc.getTiposDoc().then(res => setItems(res.data));
        setPageState(true)
    },[estado]);

    //Abrir el modal pero vacio, lo que significa que va a ser un nuevo Item
    const openNew = () => {
        //Aqui le establece el valor vacio por defecto
        setItem(emptyItem);
        formik.setValues(emptyItem)
        setUpdateDialog(true);
    }

    //Esconder el modal
    const hideDialog = () => {
        setUpdateDialog(false);
    }

    //Esconde la ventana de dialogo de el delete
    const hidechangeStateDialog = () => {
        setchangeStateDialog(false);
    }

    //accion que se realiza al darle click a el icono de editar, recibe un objeto y este objeto depende de la posision en la tabla

    //esta funcion muestra la ventana de "está seguro de borrar?"
    const confirmChangeState = (Item) => {
        //de igual manera establece la "plantilla" para guardar el id del producto que va a borrar
        setItem(Item);
        //muestra la ventana de dialogo
        setchangeStateDialog(true);
    }

    //Eliminar
    const changeState = () => {
        servicioTipoDoc.deleteTipoDoc(Item.idRol).then(res=>{
            if(res.status===200){
                toast.current.show({ severity: 'error', summary: 'Error', detail: res.data.err, life: 3000 });
                hidechangeStateDialog()
            }else{
                toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: res.data.success, life: 3000 });
                hidechangeStateDialog()
                setEstado(!estado)
            }
        })
    }

    const barrioBodyTemplate = (rowData) => {
        return (
            <>
                {rowData.nombreTipoDoc}
            </>
        );
    }


    //corresponde a la columna de las acciones
    const actionBodyTemplate = (rowData) => {
        return (
            <Row className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editItem(rowData)} />
                <Button icon={iconchangeState} className="p-button-rounded p-button-warning" onClick={() => confirmChangeState(rowData)} />
            </Row>

        );
    }

    //Parte Superior de la tabla, donde está el search, parece que el search solo setea un estado que se define antes...
    const header = (
        <div className="grid">

                    <div className="col">
                        <span className="block mt-2 md:mt-0 p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText className="" type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
                        </span>
                    </div>
                    <Button icon="pi pi-plus" type="button" onClick={openNew} tooltip="Nuevo Tipo Documento" className="mx-auto mt-2 col-3 p-button-rounded p-button-primary" />

        </div>
    );


    //La parte inferior de el dialog de borrado, lo mismo de antes y sus dos botones
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hidechangeStateDialog} />
            <Button label="Deacuerdo" icon="pi pi-check" className="p-button-text" onClick={changeState} />
        </>
    );

    const formik = useFormik({
        initialValues: emptyItem,
        validate: (data) => {
            let errors = {};

            if (!data.nombreTipoDoc) {
                errors.nombreTipoDoc = 'El tipo documento es obligatorio.';
            }else if(!/^[A-Za-z]+$/.test(data.nombreTipoDoc)){
                errors.nombreTipoDoc = 'Solo puede contener letras.';
            }else if(data.nombreTipoDoc.length>20){
                errors.nombreTipoDoc = 'El maximo es de 20 caracteres.'
            }

            return errors;
        },
        onSubmit: (data) => {
            if (data.idRol) {

                servicioTipoDoc.updateTipoDoc(data, data.idRol).then(()=>{
                    //anuncio de exito :D
                    toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: `El Tipo Documento ${data.nombreTipoDoc} Actualizado`, life: 3000 });
                })
            }
            else {
                servicioTipoDoc.createTipoDoc(data).then(()=>{
                    //Mensaje de exito :D
                    toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: `El Tipo Documento ${data.nombreTipoDoc} A sido Creado Con Exito`, life: 3000 });
                })
            }
            //Escone la alerta
            setUpdateDialog(false);
            //resetea el formulario o mejor dicho el objeto
            setItem(emptyItem);

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

    const editItem = (Item) => {
        formik.setValues(Item)
        //muestra la ventana emerjente de actualizacion de Item
        setUpdateDialog(true);
    }


    //aqui ya empieza el codigo normal :D
    return (

        <div className="grid crud-demo">

            <div className="col-12">
                <div className="card p-0">
                    <Toast ref={toast} position="bottom-right"/>
                    <DataTable ref={dt} value={Items}
                        dataKey="id" paginator rows={3} rowsPerPageOptions={[3, 6, 30]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Registros {first} a {last} de un total de {totalRecords}"
                        globalFilter={globalFilter} emptyMessage="No se encontro ningun registro." header={header}>
                        <Column field="nombreTipoDoc" header="Tipo Documento" body={barrioBodyTemplate} sortable></Column>
                        <Column header="Acciones" body={actionBodyTemplate}></Column>
                    </DataTable>

                {/* Aqui va la ventana de editar/nuevo */}
                <Dialog visible={updateDialog} style={{ width: '450px' }} modal header={(!formik.values.idRol)?"Nuevo Tipo Documento":`Editando a ${formik.values.nombreTipoDoc}` } className="card p-fluid" footer={productDialogFooter} onHide={hideDialog}>

                    <form onSubmit={formik.handleSubmit}>
                        <div className="formgrid grid my-4">
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <i><FaUserAlt/></i>
                                    <InputText id="nombreTipoDoc" name="nombreTipoDoc" value={formik.values.nombreTipoDoc} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('nombreTipoDoc') })} />
                                    <label htmlFor="nombreTipoDoc" className={classNames({ 'p-error': isFormFieldValid('nombreTipoDoc') })}>Nombre*</label>
                                </span>
                                {getFormErrorMessage('nombreTipoDoc')}
                            </div>
                        </div>
                    </form>
                </Dialog>
                    <Dialog visible={changeStateDialog} style={{ width: '450px' }} header="¡Cuidado!" modal footer={deleteProductDialogFooter} onHide={hidechangeStateDialog}>
                        <div className="flex align-items-center justify-content-center" style={{color:'var(--yellow-700)' }}>
                            <i className="pi pi-exclamation-triangle mr-3 " style={{ fontSize: '3rem' }} />
                            {Item && <span>¿Está seguro de Eliminar el tipo denominado <b>{Item.nombreTipoDoc}</b>?</span>}
                        </div>
                    </Dialog>

                </div>
            </div>
        </div>
    )
}

export default TipoUsuario
