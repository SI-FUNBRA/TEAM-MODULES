import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { ServicioCiudad } from '../../../service/ServicioCiudad';
import { useFormik } from 'formik';

import { FaUserAlt } from "react-icons/fa";
import SelectPais from '../../../components/SelectPais';
const Ciudades = () => {

    let emptyItem = {
        idCiudad: '',
        nombreCiudad: '',
        idPais_FK:'',

          Pai:{
            nombrePais:''
        }
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

    const servicioCiudad = new ServicioCiudad();

    let iconchangeState = `pi ${(pageState)?'pi-trash':'pi-check-circle'}`

    //Obtener la data para llenar las tables
    useEffect(() => {
        const servicioCiudad = new ServicioCiudad();
        servicioCiudad.getCiudades().then(res =>  setItems(res.data) ).catch(()=>{});
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
        servicioCiudad.deleteCiudad(Item.idCiudad).then(res=>{
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
                {rowData.nombreCiudad}
            </>
        );
    }

    const paisBodyTemplate = (rowData) => {
        return (
            <>
                {rowData.Pai.nombrePais}
            </>
        );
    }


    //corresponde a la columna de las acciones
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editItem(rowData)} />
                <Button icon={iconchangeState} className="p-button-rounded p-button-warning" onClick={() => confirmChangeState(rowData)} />
            </div>

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
                    <Button icon="pi pi-plus" type="button" onClick={openNew} tooltip="Nuevo País" tooltipOptions={{position:"left"}} className="mx-auto mt-2 col-3 p-button-rounded p-button-primary" />

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

            if (!data.nombreCiudad) {
                errors.nombreCiudad = 'El país es obligatorio.';
            }else if(!/^[A-Za-zá-ýÁ-ý. ]+$/.test(data.nombreCiudad)){
                errors.nombreCiudad = 'No se permiten números.';
            }else if(data.nombreCiudad.length>20){
                errors.nombreCiudad = 'El maximo es de 20 caracteres.'
            }

            return errors;
        },
        onSubmit: (data) => {
            if (data.idCiudad) {

                servicioCiudad.updateCiudad(data, data.idCiudad).then(()=>{
                    //anuncio de exito :D
                    toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: `La Ciudad ${data.nombreCiudad} Actualizado`, life: 3000 });
                })
            }
            else {
                servicioCiudad.createCiudad(data).then(()=>{
                    //Mensaje de exito :D
                    toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: `La Ciudad ${data.nombreCiudad} A sido Creado Con Exito`, life: 3000 });
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
                        <Column field="nombreCiudad" header="Nombre" body={barrioBodyTemplate} sortable></Column>
                        <Column field="Pai.nombrePais" header="País" body={paisBodyTemplate} sortable></Column>
                        <Column header="Acciones" body={actionBodyTemplate}></Column>
                    </DataTable>

                {/* Aqui va la ventana de editar/nuevo */}
                <Dialog visible={updateDialog} style={{ width: '450px' }} modal header={(!formik.values.idCiudad)?"Nuevo País":`Editando a ${formik.values.nombreCiudad}` } className="card p-fluid" footer={productDialogFooter} onHide={hideDialog}>

                    <form onSubmit={formik.handleSubmit}>
                        <div className="formgrid grid my-4">
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <i><FaUserAlt/></i>
                                    <InputText id="nombreCiudad" name="nombreCiudad" value={formik.values.nombreCiudad} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('nombreCiudad') })} />
                                    <label htmlFor="nombreCiudad" className={classNames({ 'p-error': isFormFieldValid('nombreCiudad') })}>Nombre*</label>
                                </span>
                                <span className="p-float-label p-input-icon-right my-4">
                                    <i><FaUserAlt/></i>
                                    <SelectPais name="idPais_FK" value={formik.values.idPais_FK} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('idPais_FK') })}/>
                                </span>
                                {getFormErrorMessage('nombreCiudad')}
                            </div>
                        </div>
                    </form>
                </Dialog>
                    <Dialog visible={changeStateDialog} style={{ width: '450px' }} header="¡Cuidado!" modal footer={deleteProductDialogFooter} onHide={hidechangeStateDialog}>
                        <div className="flex align-items-center justify-content-center" style={{color:'var(--yellow-700)' }}>
                            <i className="pi pi-exclamation-triangle mr-3 " style={{ fontSize: '3rem' }} />
                            {Item && <span>¿Está seguro de Eliminar la ciudad denominada <b>{Item.nombreCiudad}</b>?</span>}
                        </div>
                    </Dialog>

                </div>
            </div>
        </div>
    )
}

export default Ciudades
