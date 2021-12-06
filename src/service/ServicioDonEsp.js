import axios from 'axios';

const URL = `${process.env.REACT_APP_API_URL}/solicitudDonacionEspecie`

export class SolicitudDonacionEspecie {

    getDonacionesEsp(){
        return axios.get(URL)
    }

}

