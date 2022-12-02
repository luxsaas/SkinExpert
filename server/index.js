const express = require('express');
const helmet =require("helmet");
const morgan=require("morgan");
const port = 8000;

const {
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
    deleteIteminBin,
    deleteIteminBin2,
    updateUser,
    addMessage,
    deleteCurrentRoutine} = require("./handlers.js");
express()

    .use(express.json())
    .use(helmet())
    .use(morgan('tiny'))

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
    .patch('/currentroutine/:activeUser/:step',deleteCurrentRoutine)
    .patch('/routine/:activeUser/:_id',deleteIteminBin)
    .patch('/routine2/:activeUser/:_id',deleteIteminBin2)
    .get('/routine/:activeUser',getRoutine)
    .post('/message/:activeUser/:_id',addMessage)


    
    .listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })