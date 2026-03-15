import { Controller, type Control, type FieldError } from "react-hook-form";
import type { FormValues } from "../formsCustom/CustomForms";

import './input.css';
interface Props {
    name: keyof FormValues;
    control: Control<FormValues>;
    label: string;
    type?:string;
    error?:FieldError;
}

const InputForm =({name,control,label,type,error}:Props)=>{
    return(
        <div className="form-group">
            <label htmlFor={name} className="form-label"> {label}</label>
            <Controller name={name} control={control} render={
                ({field})=> <input  id={name} type={type}  {...field}className={`form-control ${error ? "is-valid":""}`}/>
             
            }/>
               {error && <p className="error"> {error.message} </p>}
        </div>
    )
}

export  default InputForm