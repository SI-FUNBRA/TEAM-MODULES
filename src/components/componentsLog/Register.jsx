import React, { useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import SelectCiudad from '../../components/selectCiudad/SelectCiudad';
import SelectTipoDocumento from '../../components/tipoDoc/SelectTipoDocumento';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Tooltip } from 'primereact/tooltip';


const Register = () => {
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

            username:'',
            pass:'',
            pass2:''

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

            if(!data.pass){
                errors.pass = 'La Contraseña es obligatoria.';
            }else if(!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(data.pass)){
                errors.pass = 'La Contraseña es Poco Segura.';
            }

            if(!data.pass2){
                errors.pass2 = 'La Validacion de Contraseña es obligatoria.';
            }else if(!(data.pass === data.pass2)){
                errors.pass2 = 'Las Contraseñas no coinciden.';
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


    //estilado del selector de año y mes del calendario
    const monthNavigatorTemplate=(e)=> {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} style={{ lineHeight: 1 }} />;
    }

    const yearNavigatorTemplate=(e)=> {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} className="p-ml-2" style={{ lineHeight: 1 }} />;
    }

    const headerPass = <h6>Contraseña</h6>;
    const footerPass = (
        <React.Fragment>
        <Divider />
        <p className="p-mt-2">Condiciones de seguridad:</p>
        <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: "1.5" }}>
            <li>Se necesita una letra minuscula</li>
            <li>Se necesita una letra mayuscula</li>
            <li>Se necesita un numero</li>
            <li>Minimo 8 caracteres</li>
        </ul>
        </React.Fragment>
    );


    return (
        <div className="flex align-items-center justify-content-center" style={{width: "100%", height: "100%", position: 'fixed'}}>

            <div className="p-d-flex p-jc-center">
                <div className="card">
                    <h5 className="p-text-center">Registrate</h5>
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="formgrid grid my-4">
                            <div className="p-field col">
                                <span className="p-float-label">
                                    <InputText tooltip="Ingrese Su Nombre" id="nombreUsuario" name="nombreUsuario" value={formik.values.nombreUsuario} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('nombreUsuario') })} />
                                    <label htmlFor="nombreUsuario" className={classNames({ 'p-error': isFormFieldValid('nombreUsuario') })}>Nombre*</label>
                                </span>
                                {getFormErrorMessage('nombreUsuario')}
                            </div>
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-envelope" />
                                    <InputText tooltip="Ingrese Su Apellido" id="apellidoUsuario" name="apellidoUsuario" value={formik.values.apellidoUsuario} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('apellidoUsuario') })} />
                                    <label htmlFor="apellidoUsuario" className={classNames({ 'p-error': isFormFieldValid('apellidoUsuario') })}>Apellido*</label>
                                </span>
                                {getFormErrorMessage('apellidoUsuario')}
                            </div>
                        </div>

                        <div className="formgrid grid my-4">
                            <div className="p-field col">
                                <span className="p-float-label">
                                    <InputText tooltip="Ingrese Su Correo Personal" id="correoUsuario" name="correoUsuario" value={formik.values.correoUsuario} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('correoUsuario') })} />
                                    <label htmlFor="correoUsuario" className={classNames({ 'p-error': isFormFieldValid('correoUsuario') })}>Correo*</label>
                                </span>
                                {getFormErrorMessage('correoUsuario')}
                            </div>
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-envelope" />
                                    <InputText tooltip="Confirme Su Correo" id="correoUsuario2" name="correoUsuario2" value={formik.values.correoUsuario2} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('correoUsuario2') })} />
                                    <label htmlFor="correoUsuario2" className={classNames({ 'p-error': isFormFieldValid('correoUsuario2') })}>Verificacion De Correo*</label>
                                </span>
                                {getFormErrorMessage('correoUsuario2')}
                            </div>
                        </div>

                        <div className="formgrid grid my-4">
                            <div className="p-field col">
                                <span className="p-float-label">
                                    <InputText tooltip="Ingrese Su Numero De Telefono" id="telefonoFijo" name="telefonoFijo" value={formik.values.telefonoFijo} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('telefonoFijo') })} />
                                    <label htmlFor="telefonoFijo" className={classNames({ 'p-error': isFormFieldValid('telefonoFijo') })}>Telefono</label>
                                </span>
                                {getFormErrorMessage('telefonoFijo')}
                            </div>
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-envelope" />
                                    <InputText tooltip="Ingrese Su Numero Celular" id="telefonoCelular" name="telefonoCelular" value={formik.values.telefonoCelular} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('telefonoCelular') })} />
                                    <label htmlFor="telefonoCelular" className={classNames({ 'p-error': isFormFieldValid('telefonoCelular') })}>Telefono Celular*</label>
                                </span>
                                {getFormErrorMessage('telefonoCelular')}
                            </div>
                        </div>

                        <div className="formgrid grid my-4">
                            <div className="p-field col">
                                <span className="p-float-label">
                                    <Calendar tooltip="Ingrese Su Fecha De Nacimiento" name="fechaNacimientoUsuario" yearRange={`${today.getFullYear()-90}:${today.getFullYear()-14}`} id="fechaNacimientoUsuario" value={formik.values.fechaNacimientoUsuario} onChange={formik.handleChange}  monthNavigator yearNavigator className={classNames({ 'p-invalid': isFormFieldValid('fechaNacimientoUsuario') })}
                                    readOnlyInput monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate}/>
                                    <label htmlFor="fechaNacimientoUsuario" className={classNames({ 'p-error': isFormFieldValid('fechaNacimientoUsuario') })}>Fecha Nacimiento*</label>
                                </span>
                                {getFormErrorMessage('fechaNacimientoUsuario')}
                            </div>
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-envelope" />
                                    <SelectCiudad tooltip="Seleccione Su Ciudad De Recidencia" name="idCiudad_FK" value={formik.values.idCiudad_FK} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('idCiudad_FK') })} />
                                    <label htmlFor="idCiudad_FK" className={classNames({ 'p-error': isFormFieldValid('idCiudad_FK') })}>Ciudad Recidencia*</label>
                                </span>
                                {getFormErrorMessage('idCiudad_FK')}
                            </div>
                        </div>

                        <label htmlFor="idTipoDocumento_FK" className={classNames({ 'p-error': isFormFieldValid('idTipoDocumento_FK5') })}>Tipo Documento*</label>
                        <SelectTipoDocumento name="idTipoDocumento_FK" value={formik.values.idTipoDocumento_FK} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('idTipoDocumento_FK') })}/>
                        {getFormErrorMessage('idTipoDocumento_FK')}


                        <div className="formgrid grid my-4">
                            <div className="p-field col">
                                <span className="p-float-label">
                                    <InputText tooltip="Ingrese Su Número de documento" id="numeroDocumento" name="numeroDocumento" value={formik.values.numeroDocumento} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('numeroDocumento') })} />
                                    <label htmlFor="numeroDocumento" className={classNames({ 'p-error': isFormFieldValid('numeroDocumento') })}>Numero De Documento*</label>
                                </span>
                                {getFormErrorMessage('numeroDocumento')}
                            </div>
                            <div className="p-field col">
                                <span className="p-float-label p-input-icon-right">
                                    <Calendar tooltip="Ingrese la fecha de expedicion de su documento" name="fechaExpedicionDoc" yearRange={`${today.getFullYear()-90}:${today.getFullYear()}`} id="fechaExpedicionDoc" value={formik.values.fechaExpedicionDoc} onChange={formik.handleChange}  monthNavigator yearNavigator className={classNames({ 'p-invalid': isFormFieldValid('fechaExpedicionDoc') })}
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
                        <div className="formgrid grid my-4">
                            <div className="p-field col">
                                <span className="p-float-label">
                                    <Tooltip target=".passTooltip">Ingrese su contraseña de acceso</Tooltip>
                                    <Password
                                    value={formik.values.pass}
                                    id="pass"
                                    name="pass"
                                    toggleMask
                                    promptLabel="Ingrese la contraseña"
                                    weakLabel="Poco Segura"
                                    mediumLabel="Medianamente Segura"
                                    strongLabel="Muy Segura"
                                    onChange={formik.handleChange}
                                    header={headerPass}
                                    content=""
                                    footer={footerPass}
                                    className="passTooltip"
                                    />
                                    <label htmlFor="pass" className={classNames({ 'p-error': isFormFieldValid('pass') })}>Contraseña:</label>

                                </span>
                                 {getFormErrorMessage('pass')}
                            </div>
                            <div className="p-field col">
                                <span className="p-float-label">
                                    <Tooltip target=".pass2Tooltip">Verifique su contraseña de acceso</Tooltip>
                                    <Password
                                    value={formik.values.pass2}
                                    id="pass2"
                                    name="pass2"
                                    toggleMask
                                    onChange={formik.handleChange}
                                    feedback={false}
                                    className="pass2Tooltip"
                                    />
                                    <label htmlFor="pass2" className={classNames({ 'p-error': isFormFieldValid('pass2') })}>Contraseña:</label>

                                </span>
                                 {getFormErrorMessage('pass2')}
                            </div>
                        </div>

                        <Button type="submit" label="Submit" className="p-mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );
}


export default Register
