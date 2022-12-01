const express = require('express');
const helmet =require("helmet");
const morgan=require("morgan");
const port = 8000;

const {
    getCategory,
    addCartItem,
    getUser,addUser,
    getProducts,
    getPosts,
    addPost,
    getProduct,
    getProductByCategory,
    getProductByBrand,
    getBrands,
    getProductByConcern,
    addCurrentRoutine,
    getRoutine,
    deleteRoutine,
    updateUser} = require("./handlers.js");
express()

    .use(express.json())
    .use(helmet())
    .use(morgan('tiny'))
    .get('/category', getCategory)
    .post('/category',addCartItem)
    .get('/users/:user',getUser)
    .post('/users',addUser)
    .patch('/users/:name',updateUser)
    .get('/products',getProducts)
    .get('/product/:id',getProduct)
    .get('/product/category/:category',getProductByCategory)
    .get('/product/concern/:skin_concern',getProductByConcern)
    .get('/product/brand/:brand',getProductByBrand)
    .get('/brands',getBrands)
    .get('/posts',getPosts)
    .post('/posts',addPost)
    .post('/routine/:activeUser/:step',addCurrentRoutine)
    .delete('/routine/:activeUser/:step',deleteRoutine)
    .get('/routine/:activeUser',getRoutine)


    
    .listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })