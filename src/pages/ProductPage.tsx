import React from "react"
import {Product} from "../components/Product";
import {IProduct} from "../models";
import {useProducts} from "../hooks/products";
import Loader from "../components/Loader";
import ErrorMessage from "../components/Error";
import Modal from "../components/Modal"
import { CreateProduct } from '../components/CreateProduct';
import { ModalContext } from '../context/ModalContext';
import { useContext } from "react";

export const ProductPage = () => {
   const { error, loading, products, addProduct } = useProducts()
  const {modal, open, close }= useContext(ModalContext)

    const modalHendler = (product:IProduct) => {
        close()
        addProduct(product)
    }
    return (
        <>
        <div className="container mx-auto max-w-2xl pt-5">
            {loading && <Loader/>}
            {error && <ErrorMessage error={error}/>}
            {products.map(product => <Product product={product} key={product.id} />)}
              {modal &&  <Modal title='Create new product' onClose={close}>
                    <CreateProduct onCreate={modalHendler} />
                </Modal>}
                <button className='fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 py-2'
                onClick={open}>+</button>
            </div>
            
            
            
            </>
    );
}