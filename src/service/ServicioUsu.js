import axios from 'axios';


const URL = `${process.env.REACT_APP_API_URL}/usuarios`

export class ServicioUsu {

    getUsuarios(){
        return axios.get(URL)
    }

    getUsuarioPorId(id){
        return axios.get(`${URL}/usuario/${id}`)
    }

    getUsuariosInactivos(){
        return axios.get(`${URL}/inactivos`)
    }

    getUsertopbar(){
        axios.defaults.headers.common['token'] = localStorage.getItem('token')

        return axios.get(`${URL}/usertopbar`)
    }

    createUsuario(data){
        return axios.post(`${URL}/create`,data)
    }

    updateUsuario(idUsuario,data){
        return axios.put(`${URL}/actualizar/${idUsuario}`,data)
    }

    changeStateUsuario(idUsuario,ruta){
        return axios.put(`${URL}/${ruta}/${idUsuario}`)
    }

}
