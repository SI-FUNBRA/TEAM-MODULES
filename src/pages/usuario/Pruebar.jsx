import React, { useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import SelectCiudad from '../../components/selectCiudad/SelectCiudad';
import SelectTipoDocumento from '../../components/tipoDoc/SelectTipoDocumento';


const Pruebar = () => {
    let today = new Date()

    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({})


    const formik = useFormik({
        initialValues: {
            idUsuario: null,
            nombreUsuario: '',
            apellidoUsuario: '',
            correoUsuario: '',
            correoUsuario2: '',
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

        },
        validate: (data) => {
            let errors = {};

            if (!data.nombreUsuario) {
                errors.nombreUsuario = 'El Nombre es obligatorio.';
            }else if(!(data.nombreUsuario.length >= 3 && data.nombreUsuario.length <= 25)){
                errors.nombreUsuario = 'Cantidad de caracteres de 3 a 25 .';
            }

            if (!data.apellidoUsuario) {
                errors.apellidoUsuario = 'El Apellido es obligatorio.';
            }

            if (!data.correoUsuario) {
                errors.correoUsuario = 'El Correo es obligatorio.';
            }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.correoUsuario)){
                errors.correoUsuario = 'Debe ingresar un formato valido.';
            }

            if (!data.correoUsuario2){
                errors.correoUsuario2 = 'La Verificacion es obligatoria.';
            }else if(!(data.correoUsuario === data.correoUsuario2)){
                errors.correoUsuario2 = 'Los Campos no coinciden.';
            }

            if (!/^\d{0,20}$/.test(data.telefonoFijo)){
                errors.telefonoFijo = 'El Telefono debe ser un numero.';
            }

            if(!data.telefonoCelular){
                errors.telefonoCelular = 'El Celular es obligatorio.';
            }
            if (!/^\d{0,20}$/.test(data.telefonoCelular)){
                errors.telefonoCelular = 'El Celular debe ser un numero.';
            }

            if(!data.fechaNacimientoUsuario){
                errors.fechaNacimientoUsuario = 'La Fecha es obligatoria.';
            }

            if(!data.idCiudad_FK || data.idCiudad_FK === ''){
                errors.idCiudad_FK = 'La Ciudad De Recidencia es obligatoria.';
            }

            if(!data.idTipoDocumento_FK){
                errors.idTipoDocumento_FK = 'El Tipo de Documento de es obligatorio.';
            }

            if(!data.numeroDocumento){
                errors.numeroDocumento = 'El Número de Documento de es obligatorio.';
            }else if(!/^\d{0,20}$/.test(data.numeroDocumento)){
                errors.numeroDocumento = 'El Número de Documento debe ser un numero.';
            }

            if(!data.fechaExpedicionDoc){
                errors.fechaExpedicionDoc = 'La Fecha de Expedicion es obligatoria.';
            }

            if(!data.LugarExpedicionDoc){
                errors.LugarExpedicionDoc = 'El Lugar De Expedicion es obligatorio.';
            }

            return errors;
        },
        onSubmit: (data) => {
            setFormData(data);
            setShowMessage(true);

            formik.resetForm();
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const dialogFooter = <div className="p-d-flex p-jc-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;

    //estilado del selector de año y mes del calendario
    const monthNavigatorTemplate=(e)=> {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} style={{ lineHeight: 1 }} />;
    }

    const yearNavigatorTemplate=(e)=> {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} className="p-ml-2" style={{ lineHeight: 1 }} />;
    }

    return (
        <div className="grid crud-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Registration Successful!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your account is registered under name <b>{formData.name}</b> ; it'll be valid next 30 days without activation. Please check <b>{formData.email}</b> for activation instructions.
                    </p>
                </div>
            </Dialog>

            <div className="p-d-flex p-jc-center">
                <div className="card">
                    <h5 className="p-text-center">Register</h5>
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="formgrid grid my-4">
                            <div className="p-field col">
                                <span className="p-float-label">
                                    <InputText id="nombreUsuario" name="nombreUsuario" value={formik.values.nombreUsuario} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('nombreUsuario') })} />
                                    <label htmlFor="nombreUsuario" className={classNames({ 'p-error': isFormFieldValid('nombreUsuario') })}>Nombre*</label>
                                </span>
                                {getFormErrorMessage('nombreUsuario')}
                            </div>
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-envelope" />
                                    <InputText id="apellidoUsuario" name="apellidoUsuario" value={formik.values.apellidoUsuario} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('apellidoUsuario') })} />
                                    <label htmlFor="apellidoUsuario" className={classNames({ 'p-error': isFormFieldValid('apellidoUsuario') })}>Apellido*</label>
                                </span>
                                {getFormErrorMessage('apellidoUsuario')}
                            </div>
                        </div>

                        <div className="formgrid grid my-4">
                            <div className="p-field col">
                                <span className="p-float-label">
                                    <InputText id="correoUsuario" name="correoUsuario" value={formik.values.correoUsuario} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('correoUsuario') })} />
                                    <label htmlFor="correoUsuario" className={classNames({ 'p-error': isFormFieldValid('correoUsuario') })}>Correo*</label>
                                </span>
                                {getFormErrorMessage('correoUsuario')}
                            </div>
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-envelope" />
                                    <InputText id="correoUsuario2" name="correoUsuario2" value={formik.values.correoUsuario2} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('correoUsuario2') })} />
                                    <label htmlFor="correoUsuario2" className={classNames({ 'p-error': isFormFieldValid('correoUsuario2') })}>Verificacion De Correo*</label>
                                </span>
                                {getFormErrorMessage('correoUsuario2')}
                            </div>
                        </div>

                        <div className="formgrid grid my-4">
                            <div className="p-field col">
                                <span className="p-float-label">
                                    <InputText id="telefonoFijo" name="telefonoFijo" value={formik.values.telefonoFijo} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('telefonoFijo') })} />
                                    <label htmlFor="telefonoFijo" className={classNames({ 'p-error': isFormFieldValid('telefonoFijo') })}>Telefono</label>
                                </span>
                                {getFormErrorMessage('telefonoFijo')}
                            </div>
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-envelope" />
                                    <InputText id="telefonoCelular" name="telefonoCelular" value={formik.values.telefonoCelular} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('telefonoCelular') })} />
                                    <label htmlFor="telefonoCelular" className={classNames({ 'p-error': isFormFieldValid('telefonoCelular') })}>Telefono Celular*</label>
                                </span>
                                {getFormErrorMessage('telefonoCelular')}
                            </div>
                        </div>

                        <div className="formgrid grid my-4">
                            <div className="p-field col">
                                <span className="p-float-label">
                                    <Calendar name="fechaNacimientoUsuario" yearRange={`${today.getFullYear()-90}:${today.getFullYear()-14}`} id="fechaNacimientoUsuario" value={formik.values.fechaNacimientoUsuario} onChange={formik.handleChange}  monthNavigator yearNavigator className={classNames({ 'p-invalid': isFormFieldValid('fechaNacimientoUsuario') })}
                                    readOnlyInput monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate}/>
                                    <label htmlFor="fechaNacimientoUsuario" className={classNames({ 'p-error': isFormFieldValid('fechaNacimientoUsuario') })}>Fecha Nacimiento*</label>
                                </span>
                                {getFormErrorMessage('fechaNacimientoUsuario')}
                            </div>
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-envelope" />
                                    <SelectCiudad name="idCiudad_FK" value={formik.values.idCiudad_FK} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('idCiudad_FK') })} />
                                    <label htmlFor="idCiudad_FK" className={classNames({ 'p-error': isFormFieldValid('idCiudad_FK') })}>Ciudad Recidencia*</label>
                                </span>
                                {getFormErrorMessage('idCiudad_FK')}
                            </div>
                        </div>

                        <label htmlFor="idTipoDocumento_FK" className={classNames({ 'p-error': isFormFieldValid('correoUsuario2') })}>Tipo Documento*</label>
                        <SelectTipoDocumento name="idTipoDocumento_FK" value={formik.values.idTipoDocumento_FK} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('idTipoDocumento_FK') })}/>
                        {getFormErrorMessage('idTipoDocumento_FK')}


                        <div className="formgrid grid my-4">
                            <div className="p-field col">
                                <span className="p-float-label">
                                    <InputText id="numeroDocumento" name="numeroDocumento" value={formik.values.numeroDocumento} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('numeroDocumento') })} />
                                    <label htmlFor="numeroDocumento" className={classNames({ 'p-error': isFormFieldValid('numeroDocumento') })}>Numero De Documento*</label>
                                </span>
                                {getFormErrorMessage('numeroDocumento')}
                            </div>
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <Calendar name="fechaExpedicionDoc" yearRange={`${today.getFullYear()-90}:${today.getFullYear()}`} id="fechaExpedicionDoc" value={formik.values.fechaExpedicionDoc} onChange={formik.handleChange}  monthNavigator yearNavigator className={classNames({ 'p-invalid': isFormFieldValid('fechaExpedicionDoc') })}
                                    readOnlyInput monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate}/>
                                    <label htmlFor="fechaExpedicionDoc" className={classNames({ 'p-error': isFormFieldValid('fechaExpedicionDoc') })}>Fecha Expedicion Doc*</label>
                                </span>
                                {getFormErrorMessage('fechaExpedicionDoc')}
                            </div>
                        </div>

                        <div className="p-field my-4">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <SelectCiudad name="LugarExpedicionDoc" value={formik.values.LugarExpedicionDoc} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('LugarExpedicionDoc') })} />
                                <label htmlFor="LugarExpedicionDoc" className={classNames({ 'p-error': isFormFieldValid('LugarExpedicionDoc') })}>Lugar Expedicion Documento*</label>
                            </span>
                            {getFormErrorMessage('LugarExpedicionDoc')}
                        </div>

                        <Button type="submit" label="Submit" className="p-mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );
}


export default Pruebar
