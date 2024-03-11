import React, { useState } from 'react'
import './style.css'
import { useSelector } from 'react-redux'
import resImg from './images/icons8-restaurant-48 (1).png'
import resNei from './images/icons8-email-30.png'
import vegorNonveg from './images/icons8-yes-or-no-100.png'
import desImg from './images/icons8-description-64.png'
import LocaImg from './images/icons8-location-64.png'
import fileImg from './images/icons8-file-64.png'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import add from '../images/icons8-add-48.png'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
function Addrestaurant() {

  const userId = useSelector((state) => state?.users?.user?.userDetails?.userId ?? 'not Available')
  const [formErr, setErr] = useState({})
  const [isSubmited, setSubmit] = useState(false);
  const [images, setImages] = useState([])
  const [input, setInput] = useState({
    resName: "",
    neighborhood: "",
    features: "",
    foodType: "",
    description: "",
    location: "",
  })

  const navigate = useNavigate()
  const notify = () => {
    toast.success('Restuarant successfully added  !!!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const HandleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  }



  const validateForm = (values) => {
    const errors = {}

    const resnamePattern = /^[a-zA-Z ]{5,50}_?[a-zA-Z ]*$/;
    const neighborhoodPattern = /^[a-zA-Z ,\-/.]{5,100}_?[a-zA-Z ,\-/.]*$/;
    const featuresPattern = /^[a-zA-Z0-9 ,\-/.]{5,100}_?[a-zA-Z0-9 ,\-/.]*$/;
    const foodTypePattern = /^[a-zA-Z ,\-/.]{1,20}_?[a-zA-Z ,\-/.]*$/;
    const descriptionPattern = /^[a-zA-Z0-9 ,\-/.]{5,500}_?[a-zA-Z0-9 ,\-/.]*$/;
    const locationPattern = /^[a-zA-Z ,\-/.]{5,50}_?[a-zA-Z ,\-/.]*$/;




    if (!values.resName) {
      errors.resName = 'Restuarant name is required'
    }
    else if (!resnamePattern.test(values.resName)) {
      errors.resName = 'Enter 5 to 20 letter'
    }
    if (!values.neighborhood) {
      errors.neighborhood = 'neighborhood is required'
    }
    else if (!neighborhoodPattern.test(values.neighborhood)) {
      errors.neighborhood = 'Enter 5 to 20 letter'
    }
    if (!values.features) {
      errors.features = 'features is required'
    }
    else if (!featuresPattern.test(values.features)) {
      errors.features = 'Enter 5 to 30 letter'
    }
    if (!values.foodType) {
      errors.foodType = 'veg/Nonveg is required'
    }
    else if (!foodTypePattern.test(values.foodType)) {
      errors.foodType = 'Enter 5 to 20 letter'
    }

    if (!values.description) {
      errors.description = 'description is required'
    }
    else if (!descriptionPattern.test(values.description)) {
      errors.description = 'Enter 5 to 100 letter'

    }


    if (!values.location) {
      errors.location = 'Location is required'
    }
    else if (!locationPattern.test(values.location)) {
      errors.location = 'Enter 5 to 20 letter'
    }

    return errors

  }
  const handleImageChange = (index, event) => {
    // const files = event.target.files;
    // setImages(prevImages => [...prevImages, files]);

    const fileList = Array.from(event.target.files);

    setImages(prevImages => {
      const updatedImages = [...prevImages];
      updatedImages[index] = fileList;
      return updatedImages;
    });
  }


  const addImageField = (e) => {
    e.preventDefault();
    setImages(prevImages => [...prevImages, []]);

    // const imgWraper = document.getElementById("img-field-wraper");
    // // console.log(imgWraper.children);
    // const newField = document.createElement('input');
    // newField.type = 'file';
    // newField.name = '';
    // newField.accept = "images/*";
    // newField.addEventListener('change', imageHandler);

    // imgWraper.appendChild(newField);

    // console.log("added----");
  }
  const HandleSubmit = (e) => {
    e.preventDefault()
    setErr(validateForm(input))
    setSubmit(true)
    submitForm()

  }

  const submitForm = () => {
    const formData = new FormData();
    formData.append("resName", input.resName);
    formData.append("neighborhood", input.neighborhood);
    formData.append("features", input.features);
    formData.append("foodType", input.foodType);
    formData.append("description", input.description);
    formData.append("location", input.location);
    images.forEach((image) => {
      image.forEach((img) => {
        formData.append('photographs', img)
      })
    });



    if (Object.keys(formErr).length == 0 && isSubmited) {
      try {
        const res = axios.post(`http://localhost:5000/addres/${userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true


        })

        if (res?.data?.success ?? []) {
          notify()
          setTimeout(async () => {
            navigate('/myRes');
          }, 2999);
        }

      } catch (error) {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }

    console.log("images-------------------->", images);


  }


  return (
    <div className='addRes'>
      <ToastContainer />
      <form action="" onSubmit={HandleSubmit}>
        <div className='addresSub'>
          <div className='sing-head'>
            <img src={add} alt="" />
            <h1>Add Restaurants</h1>
          </div>

          <div className='inputSection-main'>
            <label htmlFor="" style={{ 'textAlign': 'center' }}><b> Restuarants name</b></label>
            <div className='input-sec'>
              <img className='iconsLo' src={resImg} alt="" />
              <input type="text"
                onChange={HandleInputChange}
                name='resName'
                value={input.resName}
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
                value={input.neighborhood}
                name='neighborhood'
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
                value={input.features}
                name='features'
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
                value={input.foodType}
                name='foodType'

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
                value={input.description}
                name='description'
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
                value={input.location}
                name='location'
              />
            </div>
            <span className='error-message'>{formErr.location}</span>
          </div>

          <div className='inputSection-main'>
            <label htmlFor="" style={{ 'textAlign': 'center' }}><b> Choose  photos</b></label>
            <div className='input-sec'>
              <img className='iconsLo' src={fileImg} alt="" />

              <div id='img-field-wraper'>
                {images.length <= 3 ? images.map((imageList, index) => (
                  <div key={index}>
                    <input type="file" multiple onChange={(event) => handleImageChange(index, event)} />
                  </div>
                )) : setImages([])}
              </div>

            </div>
            <Button onClick={addImageField} variant="dark" type='sumit'>Add more</Button>
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
export default Addrestaurant
