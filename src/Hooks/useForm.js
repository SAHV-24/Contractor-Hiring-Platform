import { useState } from "react"

export const useForm = (initialState = {})=>{

    // Estado global del formulario
    const [formState, setFormState] = useState( initialState )

    // función para manipular el cambio de un input
    const onInputChange = (evt) =>{
        
        const {name, value} = evt.target

        setFormState({
            ...formState,
            [name]: value // Agrega el nuevo valor en el input que corresponda
        })

    }

    //función para resetar el formulario
    const onResetForm = ()=>{
        setFormState(initialState)
    }

    //Devuelve los estados y funciones para los componentes de formulario
    return{
        ...formState,
        formState,
        onInputChange,
        onResetForm
    }


}