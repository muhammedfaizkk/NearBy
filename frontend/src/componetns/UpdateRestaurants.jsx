import React, { useState } from 'react'
import './style.css'
import { useSelector } from 'react-redux'
import resImg from './images/icons8-restaurant-48 (1).png'
import resNei from './images/icons8-email-30.png'
import vegorNonveg from './images/icons8-yes-or-no-100.png'
import desImg from './images/icons8-description-64.png'
import fileImg from './images/icons8-file-64.png'
import LocaImg from './images/icons8-location-64.png'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import add from '../images/icons8-add-48.png'
import { useNavigate, useParams } from 'react-router-dom'

function UpdateRestaurants() {
    const navigate = useNavigate()
    const { id } = useParams()
    const data = useSelector((state) => state?.restuarants?.myRes)
    const prevRes = data.find((item) => item._id === id);
    const [formErr, setErr] = useState({})
    const [isSubmited, setSubmit] = useState(false);
    const [updatedInput, setUpdatedInput] = useState({
        resName: prevRes.resName,
        neighborhood: prevRes.neighborhood,
        features: prevRes.features,
        foodType: prevRes.foodType,
        description: prevRes.description,
        location: prevRes.location,
        photographs: null,
    })


    const HandleInputChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'photographs') {
            setUpdatedInput({ ...updatedInput, [name]: files[0] });
            // console.log(files[0] );

        } else {
            setUpdatedInput({ ...updatedInput, [name]: value });
        }
        // console.log(files[0] );


    };

    console.log(updatedInput);


    const validateForm = (values) => {
        const errors = {}
        const resnamePattern = /^[a-zA-Z ]{5,20}_?[a-zA-Z ]*$/;
        const neighborhoodPattern = /^[a-zA-Z ]{5,20}_?[a-zA-Z ]*$/;
        const featuresPattern = /^[a-zA-Z0-9 ]{5,30}_?[a-zA-Z0-9 ]*$/;
        const foodTypePattern = /^[a-zA-Z ]{5,20}_?[a-zA-Z ]*$/;
        const descriptionPattern = /^[a-zA-Z0-9 ]{5,100}_?[a-zA-Z0-9 ]*$/;
        const locationPattern = /^[a-zA-Z ]{5,20}_?[a-zA-Z ]*$/;



       if (!resnamePattern.test(values.resName)) {
            errors.resName = 'Enter 5 to 20 letter'
        }
        if (!neighborhoodPattern.test(values.neighborhood)) {
            errors.neighborhood = 'Enter 5 to 20 letter'
        }
         if (!featuresPattern.test(values.features)) {
            errors.features = 'Enter 5 to 30 letter'
        }
        if(!foodTypePattern.test(values.foodType)) {
            errors.foodType = 'Enter 5 to 20 letter'
        }

      if (!descriptionPattern.test(values.description)) {
            errors.description = 'Enter 5 to 100 letter'

        }


        if (!locationPattern.test(values.location)) {
            errors.location = 'Enter 5 to 20 letter'
        }

        return errors

    }

    const submitForm = async () => {

        const formData = new FormData();
        for (let key in updatedInput) {
            formData.append(key, updatedInput[key]);
        }

        if (Object.keys(formErr).length === 0 && isSubmited) {
            try {
                const res = await axios.put(`http://localhost:5000/updateRes/${id}`, formData, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                if (res.data.success) {
                    navigate('/myRes')
                }
            } catch (error) {
                alert(error);
            }
        }


    }

    const HandleSubmit = (e) => {
        e.preventDefault()
        setErr(validateForm(updatedInput))
        setSubmit(true)
        submitForm()
    }
    return (
        <div className='addRes'>

            <form action="" onSubmit={HandleSubmit}>
                <div className='addresSub'>
                    <div className='sing-head'>
                        <img src={add} alt="" />
                        <h1>Update Restaurants</h1>
                    </div>

                    <div className='inputSection-main'>
                        <label htmlFor="" style={{ 'textAlign': 'center' }}><b> Restuarants name</b></label>
                        <div className='input-sec'>
                            <img className='iconsLo' src={resImg} alt="" />
                            <input type="text"
                                onChange={HandleInputChange}
                                name='resName'
                                value={updatedInput.resName}
                            

                            />
                        </div>
                        <span className='error-message'>{formErr.resName}</span>
                    </div>

                    <div className='inputSection-main'>
                        <label htmlFor="" style={{ 'textAlign': 'center' }}><b> Neighborhood</b></label>
                        <div className='input-sec'>
                            <img className='iconsLo' src={resNei} alt="" />
                            <input type="text"
                                onChange={HandleInputChange}
                                name='neighborhood'
                                value={updatedInput.neighborhood}
                            />
                        </div>
                        <span className='error-message'>{formErr.neighborhood}</span>
                    </div>
                    <div className='inputSection-main'>
                        <label htmlFor="" style={{ 'textAlign': 'center' }}><b> Features</b></label>
                        <div className='input-sec'>
                            <img className='iconsLo' src={resImg} alt="" />
                            <input type="text"
                                onChange={HandleInputChange}
                                name='features'
                                value={updatedInput.features}
                            />
                        </div>
                        <span className='error-message'>{formErr.features}</span>
                    </div>
                    <div className='inputSection-main'>
                        <label htmlFor="" style={{ 'textAlign': 'center' }}><b> Food Type</b></label>
                        <div className='input-sec'>
                            <img className='iconsLo' src={vegorNonveg} alt="" />
                            <input type="text"
                                onChange={HandleInputChange}
                                name='foodType'
                                value={updatedInput.foodType}

                            />
                        </div>
                        <span className='error-message'>{formErr.foodType}</span>
                    </div>
                    <div className='inputSection-main'>
                        <label htmlFor="" style={{ 'textAlign': 'center' }}><b> Description</b></label>
                        <div className='input-sec'>
                            <img className='iconsLo' src={desImg} alt="" />
                            <input type="text"
                                onChange={HandleInputChange}
                                name='description'
                                value={updatedInput.description}
                            />
                        </div>
                        <span className='error-message'>{formErr.description}</span>
                    </div>

                    <div className='inputSection-main'>
                        <label htmlFor="" style={{ 'textAlign': 'center' }}><b> Location</b></label>
                        <div className='input-sec'>
                            <img className='iconsLo' src={LocaImg} alt="" />
                            <input type="text"
                                onChange={HandleInputChange}
                                name='location'
                                value={updatedInput.location}
                            />
                        </div>
                        <span className='error-message'>{formErr.location}</span>
                    </div>

                    <div className='inputSection-main'>
                        <label htmlFor="" style={{ 'textAlign': 'center' }}><b> Choose  photos</b></label>
                        <div style={{ 'display': 'flex' }} className='input-sec'>
                            <img className='iconsLo' src={fileImg} alt="" />
                            <input style={{ 'flex': '1' }}
                                type="file"
                                id="photoInput"
                                name="photographs"
                                onChange={HandleInputChange}
                            />
                        </div>
                        <span className='error-message'></span>
                    </div>


                    <div className='endSection'>
                        <Button variant="dark" type='sumit'>Upload</Button>
                    </div>


                </div>
            </form>
        </div>
    )
}

export default UpdateRestaurants
















