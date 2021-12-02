import React from 'react';

import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Divider } from "primereact/divider";
import { useHistory } from 'react-router';
import { ServicioCredencial } from '../../service/ServicioCredencial';
import { Card } from 'react-bootstrap';

export const RecoverPass = (props) => {

    const serviCredencial = new ServicioCredencial()

    const history = useHistory();

    const handleLogin = () =>{
        history.push('/log/login')
    }

    const formik = useFormik({
        initialValues: {
            username: ''
        },
        validate: (data) => {


            let errors = {};

            if (!data.username) {
                errors.username = 'Ingrese un usuario';
            }

            return errors;
        },
        onSubmit: (data) => {
            serviCredencial.RecoverPassword(data).then(res=>{
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

    return (
        <div className="flex align-items-center justify-content-center" style={{width: "100%", height: "100%", position: 'fixed'}}>
            <div className="card p-5">
                <div className="flex align-items-center justify-content-center">
                        <form onSubmit={formik.handleSubmit} className="p-fluid relative">
                            <h5 className="text-center">Restablecer Contraseña</h5>
                            <div className="formgrid mt-5 mb-4 relative">
                                <Card className="mb-4 mx-2 p-2 text-" style={{width:"300px"}}>
                                    <p>Aquí podrá ingresar su nombre de usuario que tiene registrado, para la debida recuperación de su contraseña.</p>
                                </Card>
                                <div className="field col p-inputgroup m-0 relative">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user"></i>
                                    </span>
                                    <span className="p-float-label">
                                        <InputText
                                        tooltip="Ingrese su nombre de usuario"
                                        tooltipOptions={{position: 'bottom'}}
                                        id="username"
                                        name="username"
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        autoFocus
                                        className={classNames({ 'p-invalid': isFormFieldValid('username') })}
                                        />
                                        <label htmlFor="username" className={classNames({ 'p-error': isFormFieldValid('username') })}>Nombre de Usuario:</label>
                                    </span>
                                    <p className="mx-6 absolute" style={{top:'3rem'}}>{getFormErrorMessage('username')}</p>
                                </div>
                            </div>
                            <Button type="submit" label="Recuperar" className="mx-2" style={{width:"300px"}}/>

                        </form>
                </div>
                <Divider align="center" />

                <div className="flex align-items-center justify-content-center">
                    <Button onClick={handleLogin} label="Iniciar Sesión" icon="pi pi-user-plus" style={{backgroundColor:'var(--green-300)', border:'var(--green-300)'}} ></Button>
                </div>

            </div>


        </div>
    );
}

export default RecoverPass



