import axios from 'axios';

const URL = `${process.env.REACT_APP_API_URL}/pais`

export class ServicioPais {

    getPaises__Ciudad(){
        return axios.get(`${URL}/paises__ciudad`)
    }

}
