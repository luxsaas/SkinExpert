const express = require('express');
const helmet =require("helmet");
const morgan=require("morgan");
const port = 8000;

const {
    getPosts,
    addPost,
    addCurrentRoutine,
    getRoutine,
    deleteIteminBin,
    deleteIteminBin2,
    addMessage,addMessage2,
    deleteCurrentRoutine} = require("./handlers.js");

const {
    getUser,addUser,
    updateUser} = require("./handlers.user.js");
const {
    getProducts,getProduct,
    getProductByCategory,
    getProductByBrand,
    getBrands,
    getProductByConcern} = require("./handlers.products");

express()

    .use(express.json())
    .use(helmet())
    .use(morgan('tiny'))

    .get('/users/:name',getUser)
    .post('/users',addUser)
    .patch('/users/:name',updateUser)
    .get('/products',getProducts)
    .get('/product/:id',getProduct)
    .get('/product/category/:category',getProductByCategory)
    .get('/product/concern/:skin_concern',getProductByConcern)
    .get('/product/brand/:brand',getProductByBrand)
    .get('/brands',getBrands)
    .get('/posts/:user',getPosts)
    .post('/posts',addPost)
    .post('/routine/:activeUser/:step',addCurrentRoutine)
    .patch('/currentroutine/:activeUser/:step',deleteCurrentRoutine)
    .patch('/routine/:activeUser/:_id',deleteIteminBin)
    .patch('/routine2/:activeUser/:_id',deleteIteminBin2)
    .get('/routine/:activeUser',getRoutine)
    .post('/message/:activeUser/:_id',addMessage)
    .post('/message2/:activeUser/:_id',addMessage2)


    
    .listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })