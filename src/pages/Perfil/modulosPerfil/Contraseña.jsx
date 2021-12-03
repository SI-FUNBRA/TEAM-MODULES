import classNames from 'classnames';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import React, { useEffect } from 'react'

import { ServicioCredencial } from '../../../service/ServicioCredencial';
import { Password } from 'primereact/password';
import { Tooltip } from 'primereact/tooltip';

import { Divider } from 'primereact/divider';

const Contraseña = (params) => {

    const serviCredencial = new ServicioCredencial()

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

    const formik = useFormik({
        initialValues: {
            oldpass:"",
            pass:"",
            pass2:""
        },
        validate: (data) => {
            let errors = {};

            if(!data.oldpass){
                errors.oldpass = 'La Contraseña Antigua es obligatoria.';
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
            serviCredencial.NewPass(data, params.data.idUsuario).then(res=>{
                if(res.status === 201){
                    params.toast.current.show({ severity: 'success', summary: 'Todo bien', detail: res.data.success, life: 3000 });
                }else{
                    params.toast.current.show({ severity: 'error', summary: 'Error', detail: res.data.err, life: 3000 });
                }
            })
            formik.resetForm()
        }
    });

    useEffect(() => {

    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };



    return (

            <div className="p-d-flex p-jc-center">
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="p-field my-4">
                            <div className="p-field col">
                                <span className="p-float-label">
                                    <Tooltip target=".oldpassTooltip" position="left">Escriba su anterior contraseña de acceso</Tooltip>
                                    <Password
                                    value={formik.values.oldpass}
                                    id="oldpass"
                                    name="oldpass"
                                    toggleMask
                                    onChange={formik.handleChange}
                                    feedback={false}
                                    className="oldpassTooltip"
                                    />
                                    <label htmlFor="oldpass" className={classNames({ 'p-error': isFormFieldValid('oldpass') })}>Contraseña Anterior:</label>

                                </span>
                                 {getFormErrorMessage('oldpass')}
                            </div>
                        </div>
                        <div className="p-field my-3">
                            <div className="p-field col">
                                <span className="p-float-label">
                                    <Tooltip target=".passTooltip" position="left">Ingrese una nueva contraseña de acceso</Tooltip>
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
                                    <label htmlFor="pass" className={classNames({ 'p-error': isFormFieldValid('pass') })}>Nueva Contraseña:</label>

                                </span>
                                 {getFormErrorMessage('pass')}
                            </div>
                        </div>
                        <div className="p-field my-4">
                            <div className="p-field col">
                                <span className="p-float-label">
                                    <Tooltip target=".pass2Tooltip" position="left">Verifique su nueva contraseña de acceso</Tooltip>
                                    <Password
                                    value={formik.values.pass2}
                                    id="pass2"
                                    name="pass2"
                                    toggleMask
                                    onChange={formik.handleChange}
                                    feedback={false}
                                    className="pass2Tooltip"
                                    />
                                    <label htmlFor="pass2" className={classNames({ 'p-error': isFormFieldValid('pass2') })}>Verificaión Contraseña:</label>

                                </span>
                                 {getFormErrorMessage('pass2')}
                            </div>
                        </div>
                        <Button type="submit" label="Actualizar"/>
                    </form>
                </div>
    );

}

export default Contraseña
