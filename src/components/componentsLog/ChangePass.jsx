import React from 'react';

import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Divider } from "primereact/divider";
import { useHistory, useParams } from 'react-router';
import { ServicioCredencial } from '../../service/ServicioCredencial';
import { Card } from 'react-bootstrap';
import { Password } from 'primereact/password';
import { Tooltip } from 'primereact/tooltip';

export const ChangePass = (props) => {

    const serviCredencial = new ServicioCredencial()

    const history = useHistory();

    const handleLogin = () =>{
        history.push('/log/login')
    }

   let { tokenpass } = useParams();

    const formik = useFormik({
        initialValues: {
            pass: '',
            pass2: ''
        },
        validate: (data) => {

            let errors = {};

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
            serviCredencial.ChangePassword(data, tokenpass).then(res=>{
                if(res.status===201){
                    props.toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: res.data.success, life: 3000 });
                    handleLogin()
                }else{
                    props.toast.current.show({ severity: 'error', summary: 'Error', detail: res.data.error, life: 3000 });
                }
            }).catch(err=>{
                console.log(err)
            })
            formik.resetForm();
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

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
            <div className="card p-5" style={{width:"50%", "minWidth":"350px"}}>
                        <form onSubmit={formik.handleSubmit} className="p-fluid relative">
                            <h4 className="text-center text-primary">Cambio De Contraseña</h4>
                            <div className="block mt-5 mb-4" >
                                <Card className="mb-4 mx-2 p-2 d-none d-xl-block">
                                    <p>Aquí podrá realizar el cambio correspondiente de su contraseña, ingresando una nueva que cumpla con las características indicadas para ingresar nuevamente.</p>
                                </Card>

                                <div className="grid my-4">
                                    <div className="col-12 xl:col-6">
                                        <span className="p-float-label">
                                            <Tooltip target=".passTooltip">Ingrese una nueva contraseña de acceso</Tooltip>
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
                                    <div className="col-12 xl:col-6">
                                        <span className="p-float-label">
                                            <Tooltip target=".pass2Tooltip">Vuelva a escribir su nueva contraseña</Tooltip>
                                            <Password
                                            value={formik.values.pass2}
                                            id="pass2"
                                            name="pass2"
                                            toggleMask
                                            onChange={formik.handleChange}
                                            feedback={false}
                                            className="pass2Tooltip"
                                            />
                                            <label htmlFor="pass2" className={classNames({ 'p-error': isFormFieldValid('pass2') })}>Verificación Contraseña:</label>

                                        </span>
                                        {getFormErrorMessage('pass2')}
                                    </div>
                                </div>

                            </div>
                            <Button type="submit" label="Guardar" className="mx-2 col-12" />

                        </form>
                <Divider align="center" />

                <div className="flex align-items-center justify-content-center">
                    <Button onClick={handleLogin} label="Iniciar Sesión" icon="pi pi-user-plus" style={{backgroundColor:'var(--green-300)', border:'var(--green-300)'}} ></Button>
                </div>

            </div>


        </div>
    );
}

export default ChangePass



