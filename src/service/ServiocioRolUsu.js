import axios from 'axios';


const URL = `${process.env.REACT_APP_API_URL}/usuariorol`

export class ServicioRolUsu {

    getUsuariosRol(){
        return axios.get(`${URL}/rolesusuarios`)
    }

    newUsuarioRol(data){
        return axios.post(`${URL}/nuevoRol`, data)
    }

    deleteUsuarioRol(data){
        return axios.put(`${URL}/inactivarRol`, data)
    }
}
