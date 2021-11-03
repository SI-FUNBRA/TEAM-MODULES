const reglas = {
    textos: /^[a-zA-ZÀ-ÿ\s]+$/,
    password: /^(?=.\d)(?=.[!@#$%^&])(?=.[a-z])(?=.*[A-Z]).{8,}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    numeros: /^\d{0,10}$/
}
export class FormValidations {

    validation(param, rules){
        let res = true
        rules.forEach(rule => {
            if((!rule==='required')?!reglas[rule].test(param):param.length === 0){
                res = false
            }
        });
        return res
    }

}
