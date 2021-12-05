import {useState} from 'react';

import swal from 'sweetalert'

export const useForm = (initialForm, validateForm) => {

    const[form, setForm]=useState(initialForm);
    const [errors, setErrors]=useState({});
    const[loading]=useState(false);
    const[response]=useState(null);

    const handleChange=(e)=>{
        const {name, value}=e.target
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const handleBlur=(e)=>{}

    const handleSubmit=(e)=>{
        e.preventDefault();
        handleChange(e);
        setErrors(validateForm(form));
    }

    return {
        form,
        errors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit
    }
}
