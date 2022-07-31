import axios from "axios"
import React, { useState } from "react"
import { IProduct } from "../models"
import ErrorMessage from "./Error"

const productData = {
 title: 'test product',
 price: 13.5,
 description: 'lorem ipsum set',
 image: 'https://i.pravatar.cc',
 category: 'electronic',
 rating: {
   rate: 4.53,
   count: 10
 }
}
interface CreateProductProps{
  onCreate: (product:IProduct)=>void
}

export function CreateProduct({onCreate}:CreateProductProps) {
  const [value, setValue] = useState(" ")
  const [error, setError] = useState(" ")
  const submitHandler= async (event: React.FormEvent)=>{
    event.preventDefault()
    setError("")
    if (value.trim().length === 0) {
      setError("Please, enter product title")
      return
    }
    productData.title = value
    const response = await axios.post<IProduct>("https://fakestoreapi.com/products", productData)
    onCreate(response.data)
  } 

  const valueHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return(
  <>
  <form onSubmit={submitHandler}>
        <input type='text' className="border py-2 px-4 mb-2 w-full outline-0"
          placeholder="Enter product title..."
          value={value}
          onChange={valueHandler}
        />
        {error&& <ErrorMessage error={error} />}
         <button  type="submit" className="border py-2 px-4 bg-yellow-400 hover:text-white">Create</button>
      
  </form>
     
    </>
  )
}