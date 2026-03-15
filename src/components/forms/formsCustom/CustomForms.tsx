 
import { zodResolver } from '@hookform/resolvers/zod';
import {useForm, type SubmitHandler}  from 'react-hook-form';
import z from "zod"
import InputForm from '../formsInput/CustomInput';

 const schema = z.object({email: z.string().min(5,"Email debe poseer   al menos  5   caracteres"),
    password:z.string().min(8,"Al menos  5 caracterens ")
 })

 const shemasignin = z.object({
    emal: z.string().min(5,"Email debe poseer   al menos  5   caracteres"),
    password:z.string().min(8,"Al menos  5 caracterens "),
    consfirmpassword: z.string().min(8,"Al menos  8 caracteres")
 }).refine(data=> data.password === data.consfirmpassword,{
    message:"las password es  correcta",
    path:['confirmPassword']
 })
   export type FormValues = z.infer<typeof schema>;
    const CustomForm = ()=>{
        const {control,handleSubmit , formState:{errors}}= useForm<FormValues>({
            resolver:zodResolver(schema),
            mode: "onBlur",
            defaultValues:{
                email:"",
                password:""
            }
            
        });

         const onSubmit : SubmitHandler<FormValues>=(data)=>{
            // envia el fomulario

          console.log(data) 
         }

         return(
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputForm name='email'  control={control} label="email"  type="string"  error={errors.email}/>
                        <InputForm name='password'  control={control} label="password"  type="password"  error={errors.password}/>

                        <button  type="submit">Login</button>
             </form>
         )
    } 


    export  default  CustomForm 