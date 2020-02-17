import React,{useState} from 'react';
import { useForm } from 'react-hook-form'
import {createLogEntry} from './APIservice';

const LogFormEntry=({location,onClose})=>{
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState('');
    const { register, handleSubmit } = useForm();

    const onSubmit= async(data)=>{
        try{
            setLoading(true)
            data.latitude=location.latitude;
            data.longitude=location.longitude;
            await createLogEntry(data);
            onClose(); 
        }catch(error){
            console.log(error.message);
            setError(error.message)
            setLoading(false);
        }
}

return(
    <form onSubmit={handleSubmit(onSubmit)} className='entry-form'>
        {error?<h3 className='error'>{error}</h3>:null}
        <label htmlFor='password'>Password</label>
        <input type="password" name="password" required ref={register} />
        <label htmlFor='title'>Title</label>
        <input name="title" required ref={register} />
        <label htmlFor='comments'>Comments</label>
        <textarea name='comments' rows={3} ref={register}></textarea> 
        <label htmlFor='description'>Description</label>
        <textarea name='description' rows={3} ref={register}></textarea>   
        <label htmlFor='image'>Image</label>
        <input name="image" ref={register} />
        <label htmlFor='visiteDate'>Visit Date</label>
        <input name="visiteDate"  required type="date" ref={register} /> 
        <button disabled={loading}>{loading?'Loading':'Create Travel Log'}</button>    
    </form>
)
}

export default LogFormEntry