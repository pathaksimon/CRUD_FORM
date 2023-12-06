import { Component } from "react";
import {useFormik} from "formik"



function First() {

    const formik=useFormik({
        initialValues:{
            name:"",
            surname:"",
        },
        onSubmit:values=>{
            console.log("values",values)
        },
        validate:values=>{
            let errors={}

            if(!values.name){
                errors.name="Required"
            } 

            if(!values.email){
                errors.email="Required"
            } 

            if(!values.channel){
                errors.channel="Required"
            } 

            return errors
        }
    })



     console.log(formik.errors)

  
    
     
        return (
            <form onSubmit={formik.handleSubmit}>
                <label>Name</label>
                <br />
                <input name="name" value={formik.values.name} onChange={formik.handleChange} type="text" />
                <br />
                <label>Subname</label>
                <br />
                <input name="surname" value={formik.values.surname} onChange={formik.handleChange} type="text" />
                <br />
                <button type="submit">Add data</button>
            </form>
        );
    }

export default First;
