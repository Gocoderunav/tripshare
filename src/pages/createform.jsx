

import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FaBus, FaPlus, FaTrash } from "react-icons/fa";
import { FaHotel } from "react-icons/fa";
import { MdRestaurant } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./createform.css";
import { useState } from 'react';
import { storage, db, auth } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const schema = yup.object().shape({
  description: yup.string().required("Write Description"),
  buses: yup.array().of(
    yup.object().shape({
      from: yup.string().required("From location is required"),
      to: yup.string().required("To location is required"),
      title: yup.string().required("Bus title is required"),
      phone: yup
        .string()
        .nullable()
        .transform((value, originalValue) => originalValue.trim() === "" ? null : value)
        .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
        .notRequired(),
    })
  ),
  hotels: yup.array().of(
    yup.object().shape({
      hotelname: yup.string().required("Write the Hotel Name"),
      location: yup.string().required("Write the location"),
      phone: yup
        .string()
        .nullable()
        .transform((value, originalValue) => originalValue.trim() === "" ? null : value)
        .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
        .notRequired(),
    })
  ),
  restaurants: yup.array().of(
    yup.object().shape({
      restaurantname: yup.string().required("Write the Restaurant Name"),
      location: yup.string().required("Write the location"),
      type: yup.string().required("Write the type (veg/non-veg)"),
      phone: yup
        .string()
        .nullable()
        .transform((value, originalValue) => originalValue.trim() === "" ? null : value)
        .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
        .notRequired(),
    })
  ),
});

export const CreateForm = () => {
  const { control, handleSubmit, formState: { errors }, register, reset, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      buses: [{ from: "", to: "", title: "", phone: "" }],
      hotels: [{ hotelname: "", location: "", phone: "" }],
      restaurants: [{ restaurantname: "", location: "", type: "", phone: "" }],
    },
  });

  const { fields: busFields, append: appendBus, remove: removeBus } = useFieldArray({
    control,
    name: "buses",
  });

  const { fields: hotelFields, append: appendHotel, remove: removeHotel } = useFieldArray({
    control,
    name: "hotels",
  });

  const { fields: restaurantFields, append: appendRestaurant, remove: removeRestaurant } = useFieldArray({
    control,
    name: "restaurants",
  });

  const [user] = useAuthState(auth);
  const [imageUpload, setImageUpload] = useState(null);
  const navigate = useNavigate();

  const uploadImage = async () => {
    if (!imageUpload) return null;
    const imageRef = ref(storage, `images/${imageUpload.name + uuidv4()}`);
    const snapshot = await uploadBytes(imageRef, imageUpload);
    return getDownloadURL(snapshot.ref);
  };

  const onSubmit = async (data) => {
    if (!user) {
      alert("You must be logged in to submit");
      return;
    }

    try {
      const imageUrl = await uploadImage();
      const userData = {
        ...data,
        imageUrl: imageUrl || null,
        userId: user.uid,
        username: user.displayName,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "userCards"), userData);
      localStorage.removeItem('formData'); // Clear local storage after successful submission
      navigate('/'); // Redirect to home or another page after submission
    } catch (error) {
      console.error("Error uploading data: ", error);
    }
  };

  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      reset(JSON.parse(savedFormData));
    }
  }, [reset]);

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem('formData', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="scroll-menu">
      <input type='file' style={{ color: "black" }}  onChange={(e) => { setImageUpload(e.target.files[0]) }} />
      <textarea
        placeholder="Write About Your Journey"
        {...register("description")}
      />
      {errors.description && <p>{errors.description.message}</p>}

      <FaBus size={24} />
      {busFields.map((bus, index) => (
        <div key={bus.id} className="entry">
          <input {...register(`buses.${index}.from`)} placeholder="From" />
          {errors?.buses?.[index]?.from && <p>{errors.buses[index].from.message}</p>}
          <input {...register(`buses.${index}.to`)} placeholder="To" />
          {errors?.buses?.[index]?.to && <p>{errors.buses[index].to.message}</p>}
          <input {...register(`buses.${index}.title`)} placeholder="Bus Title" />
          {errors?.buses?.[index]?.title && <p>{errors.buses[index].title.message}</p>}
          <input {...register(`buses.${index}.phone`)} placeholder="Bus Driver's Phone Number" type="text" />
          {errors?.buses?.[index]?.phone && <p>{errors.buses[index].phone.message}</p>}
          <FaPlus onClick={() => appendBus({ from: "", to: "", title: "", phone: "" })} className="icon" />
          {busFields.length > 1 && <FaTrash onClick={() => removeBus(index)} className="icon" />}
        </div>
      ))}

      <FaHotel size={24} />
      {hotelFields.map((hotel, index) => (
        <div key={hotel.id} className="entry">
          <input {...register(`hotels.${index}.hotelname`)} placeholder="Hotel/PG Name" />
          {errors?.hotels?.[index]?.hotelname && <p>{errors.hotels[index].hotelname.message}</p>}
          <input {...register(`hotels.${index}.location`)} placeholder="Location" />
          {errors?.hotels?.[index]?.location && <p>{errors.hotels[index].location.message}</p>}
          <input {...register(`hotels.${index}.phone`)} placeholder="Hotel Phone Number" type="text" />
          {errors?.hotels?.[index]?.phone && <p>{errors.hotels[index].phone.message}</p>}
          <FaPlus onClick={() => appendHotel({ hotelname: "", location: "", phone: "" })} className="icon" />
          {hotelFields.length > 1 && <FaTrash onClick={() => removeHotel(index)} className="icon" />}
        </div>
      ))}

      <MdRestaurant size={24} />
      {restaurantFields.map((restaurant, index) => (
        <div key={restaurant.id} className="entry">
          <input {...register(`restaurants.${index}.restaurantname`)} placeholder="Restaurant Name" />
          {errors?.restaurants?.[index]?.restaurantname && <p>{errors.restaurants[index].restaurantname.message}</p>}
          <input {...register(`restaurants.${index}.location`)} placeholder="Location" />
          {errors?.restaurants?.[index]?.location && <p>{errors.restaurants[index].location.message}</p>}
          <input {...register(`restaurants.${index}.type`)} placeholder="Type (veg/non-veg)" />
          {errors?.restaurants?.[index]?.type && <p>{errors.restaurants[index].type.message}</p>}
          <input {...register(`restaurants.${index}.phone`)} placeholder="Restaurant Phone Number" type="text" />
          {errors?.restaurants?.[index]?.phone && <p>{errors.restaurants[index].phone.message}</p>}
          <FaPlus onClick={() => appendRestaurant({ restaurantname: "", location: "", type: "", phone: "" })} className="icon" />
          {restaurantFields.length > 1 && <FaTrash onClick={() => removeRestaurant(index)} className="icon" />}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

