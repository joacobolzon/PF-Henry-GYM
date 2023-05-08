import {
  FILTER_BY_MUSCLE,
  GET_EXERCISES,
  GET_EXERCISE_BY_ID,
  GET_PRODUCTS,
  GET_USERS,
  POST_REGISTER,
  ORDER_BY_NAME,
  POST_PRODUCT_CREATE
} from "./action_types";
import axios from "axios";

export const getExercises = () => {
  return async function (dispatch) {
    const exercisesData = (await axios.get('/exercises')).data;
    dispatch({
      type: GET_EXERCISES,
      payload: exercisesData,
    });
  };
};

export const getProducts = () => {
  return async function (dispatch) {
    const productsData = (await axios.get('/products')).data;
    dispatch({
      type: GET_PRODUCTS,
      payload: productsData,
    });
  };
};

export const getExerciseById = (idExercise) => {
  return async function (dispatch) {
    const exerciseData = (await axios.get(`/exercises/${idExercise}`))
      .data;
    dispatch({
      type: GET_EXERCISE_BY_ID,
      payload: exerciseData,
    });
  };
};

export const getUsers = () => {
  return async function (dispatch) {
    const usersData = (await axios.get(`/users`)).data;
    dispatch({
      type: GET_USERS,
      payload: usersData,
    });
  };
};
export function postRegister(payload){
  console.log(payload)
  return async function(dispatch) {
      try {
          console.log(payload)
          const registerData = await axios.post(`/register`, payload)
          console.log(registerData)
          return registerData

      }catch(errors){
          console.log(errors);
      }
  }
};

export const filterByMuscle = (muscle) => {
  return {
      type: FILTER_BY_MUSCLE,
      payload: muscle
    };
     };
     export function getNameExercises(name){
      return async function (dispatch) {
         try {
           var json = await axios.get(`/exercises?name=${name}`);
           console.log(json.data)
           return dispatch ({
              type: 'GET_NAME_EXERCISES', 
              payload: json.data
           }) 
           
         } catch (error) {
            console.log(error.message)
         }};
    };
    export function postProductCreate(payload){
      console.log(payload)
      return async function(dispatch) {
          try {
              //console.log(payload)
              const createProduct = await axios.post(`/products`, payload)
              console.log(createProduct)
              return createProduct
    
          }catch(errors){
              console.log(errors);
          }
      }
    };

 export const orderByName = (payload) => {
   return {
     type: ORDER_BY_NAME,
      payload
   };
};  


