import axios from 'axios';

const URL = `${process.env.REACT_APP_API_URL}/credenciales`

export class ServicioCredencial {

    Login(data){
        return axios.post(`${URL}/login`,data)
    }

    ChangeRol(data){
        return axios.post(`${URL}/change-rol`,data)
    }

    register(data){
        return axios.post(`${URL}/register`, data)
    }

    validateParam(data){
        return axios.post(`${URL}/validateparam`, data)
    }

    validateUser(data){
        return axios.post(`${URL}/validateuser`, data)
    }

    changeUsername(data, idusuario){
        return axios.put(`${URL}/cambiousername/${idusuario}`, data)
    }

    RecoverPassword(data){
        return axios.post(`${URL}/olvidecontra`, data)
    }

    ChangePassword(data, tokenpass){
        return axios.put(`${URL}/restablecer-contra`, data, {headers:{"tokenpass":tokenpass}})
    }

    NewPass(data, id){
        return axios.put(`${URL}/cambiarcontra/${id}`, data)
    }

}
