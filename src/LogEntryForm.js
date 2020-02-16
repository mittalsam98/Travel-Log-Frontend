import React from 'react';
import { useForm } from 'react-hook-form'
import {createLogEntry} from './APIservice';

const LogFormEntry=({location})=>{

    const { register, handleSubmit } = useForm();

    const onSubmit= async(data)=>{
        console.log(data);
        try{
            data.latitude=location.latitude;
            data.longitude=location.longitude;
            const created= await createLogEntry(data);
            console.log(created);
        }catch(error){
            console.log(error);
        }
}

return(
    <form onSubmit={handleSubmit(onSubmit)} className='entry-form'>
        <label htmlFor='title'>Title</label>
        <input name="title" required ref={register} />
        <label htmlFor='comments'>Comments</label>
        <textarea name='comments' rows={3} ref={register}></textarea> 
        <label htmlFor='description'>Description</label>
        <textarea name='description' rows={3} ref={register}></textarea>   
        <label htmlFor='image'>Image</label>
        <input name="image" ref={register} />
        <label htmlFor='visiteDate'>Visit Date</label>
        <input name="visiteDate" type="date" ref={register} /> 
        <button>Create Travel Log</button>    
    </form>
)
}

export default LogFormEntry