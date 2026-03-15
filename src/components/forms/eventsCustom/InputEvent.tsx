import { Controller, type Control, type FieldError } from "react-hook-form";
import type { FormValues } from "../formsCustom/CustomForms";

import './inputevent.css';
import type { EventValues } from "../formsevent/formsevent";
interface Props {
    name: keyof EventValues;
    control: Control<EventValues>;
    label: string;
    type?:string;
    error?:FieldError;
}

const EventInput =({name,control,label,type,error}:Props)=>{
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

export  default EventInput