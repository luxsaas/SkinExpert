const { MongoClient } = require("mongodb");
const { userInfo } = require("os");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

require("dotenv").config();
const { MONGO_URI } = process.env;

//get all posts
const getPosts=async(req,res)=>{
    const {name}=req.params;
    const client = new MongoClient(MONGO_URI, options);
try { 
    await client.connect();
    const db = client.db("SkinExpert");
    const data = await db.collection("Posts").find({name:name}).toArray();
    if (data) {
        client.close();
        return(
        res.status(200).json({
        status: 200,
        data: data,
        })
        )
    } 
    else{
        client.close();
        return(
        res.status(400).json({
        status: 400
    }))
    }
} catch (err) {
    res.status(400).json({
        status: 400,
        message: "Bad Request",
    });
    }
   
}
//add post
const addPost=async(req,res)=>{
    const client = new MongoClient(MONGO_URI, options);
    try {
        const newPost = req.body;
        await client.connect();
        const db = client.db("SkinExpert");
        if(newPost!=null){
        await db.collection("Posts").insertOne(newPost);
        client.close();
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: newPost,
        });
    }else{
        client.close();
        return res.status(400).json({
            status: 400,
            message: "UnSuccessful"
        });
    }
    } catch (err) {
        return res.status(400).json({ status: 400, message: "Invalid data!" });
    }
}
//adding to current Routine, to favorite bin , and to dislike bin
const addCurrentRoutine = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
        const {step}=req.params;
        const{activeUser}=req.params;
        let key="";
        const obj={};

        if(step=='cleanser'){
            key='Cleanser';
        }
        else if(step=='moisturizing-cream-oils-mists'){
            key='Moisturizer';
        }
        else if(step=='facial-treatments'){
            key='Treatment';
        }
        else if(step=='eye-treatment-dark-circle-treatment'){
            key='EyeCare';
        }
        else if(step=='facial-treatment-masks'){
            key='Mask';
        }
        else if(step =='sunscreen-sun-protection'){
            key='SunScreen';
        }
        else if(step=='lip-treatments'){
            key='LipCare';
        }
        else if(step=="Favorite"){
          key='Favorite';
        }
        else if(step=="Dislike"){
          key='Dislike'
        }
    try {
        const item = req.body;
        await client.connect();
        const db = client.db("SkinExpert");
        const user =await db.collection("Routine").findOne({user:activeUser});
        if(!user){
            const newItem={user:activeUser,[key]:item};
            await db.collection("Routine").insertOne(newItem);
            client.close();
            return res.status(200).json({
                status: 200,
                message: "Success",
                data: newItem,
            });
        }
        else{
            const newItem={$set: {...{[key]:item}}};
            const query={user:activeUser};
            const result = await db.collection("Routine").updateOne(query, newItem,{upsert:true});
            client.close();
            return res.status(200).json({
                status: 200,
                message: "Success",
                data: result,
            });
        }

    } catch (err) {
        return res.status(400).json({ status: 400, message: "Invalid data!" });
    }
}
//deleting item from current routine
const deleteCurrentRoutine = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const {step}=req.params;
  const{activeUser}=req.params;
  let key="";
        const obj={};
        if(step=='cleanser'){
            key='Cleanser';
        }
        else if(step=='moisturizing-cream-oils-mists'){
            key='Moisturizer';
        }
        else if(step=='facial-treatments'){
            key='Treatment';
        }
        else if(step=='eye-treatment-dark-circle-treatment'){
            key='EyeCare';
        }
        else if(step=='facial-treatment-masks'){
            key='Mask';
        }
        else if(step =='sunscreen-sun-protection'){
            key='SunScreen';
        }
        else if(step=='lip-treatments'){
            key='LipCare';
        }
try {
  await client.connect();
  const db = client.db("SkinExpert");
  const data = await db.collection("Routine").updateOne({user:activeUser},{$unset:{[`${key}`]:1}});
    if(data!=null){
      client.close();
      return res.status(200).json({
          status: 200,
          message: "Success",
          data: data,
      });
    }
    else{
      client.close();
      return res.status(400).json({ status: 400, message: "Data is null!" });
    }
  } catch (err) {
    return res.status(400).json({ status: 400, message: "Invalid data!" });
  }
}
//deleting item from favorite bin
const deleteIteminBin = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const {_id}=req.params;
  const{activeUser}=req.params;
try {
  const item = req.body;
  await client.connect();
  const db = client.db("SkinExpert");
  const data = await db.collection("Routine").updateOne({user:activeUser,"Favorite.item._id":_id},{$unset:{"Favorite.$":1}});
    if(data!=null){
      client.close();
      return res.status(200).json({
          status: 200,
          message: "Success",
          data: data,
      });
    }
    else{
      client.close();
      return res.status(400).json({ status: 400, message: "Data is null!" });
    }
  } catch (err) {
    return res.status(400).json({ status: 400, message: "Invalid data!" });
  }
}
//deleting item from dislike bin
const deleteIteminBin2 = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const {_id}=req.params;
  const{activeUser}=req.params;
try {
  const item = req.body;
  await client.connect();
  const db = client.db("SkinExpert");
  const data = await db.collection("Routine").updateOne({user:activeUser,"Dislike.item._id":_id},{$unset:{"Dislike.$":1}});
    if(data!=null){
      client.close();
      return res.status(200).json({
          status: 200,
          message: "Success",
          data: data,
      });
    }
    else{
      client.close();
      return res.status(400).json({ status: 400, message: "Data is null!" });
    }
  } catch (err) {
    return res.status(400).json({ status: 400, message: "Invalid data!" });
  }
}
//adding message to item in favorite bin
const addMessage = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const {_id}=req.params;
  const{activeUser}=req.params;
try {
  const item = req.body;
  await client.connect();
  const db = client.db("SkinExpert");
  const data = await db.collection("Routine").updateOne({user:activeUser,"Favorite.item._id":_id},{$set:{"Favorite.$.message":item}});
    if(data!=null){
      client.close();
      return res.status(200).json({
          status: 200,
          message: "Success",
          data: data,
      });
    }
    else{
      client.close();
      return res.status(400).json({ status: 400, message: "Data is null!" });
    }
  } catch (err) {
    return res.status(400).json({ status: 400, message: "Invalid data!" });
  }
}
//adding message to item in dislike bin
const addMessage2 = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const {_id}=req.params;
  const{activeUser}=req.params;
try {
  const item = req.body;
  await client.connect();
  const db = client.db("SkinExpert");
  const data = await db.collection("Routine").updateOne({user:activeUser,"Dislike.item._id":_id},{$set:{"Dislike.$.message":item}});
    if(data!=null){
      client.close();
      return res.status(200).json({
          status: 200,
          message: "Success",
          data: data,
      });
    }
    else{
      client.close();
      return res.status(400).json({ status: 400, message: "Data is null!" });
    }
  } catch (err) {
    return res.status(400).json({ status: 400, message: "Invalid data!" });
  }
}
//get all bin information of a specific user
const getRoutine=async(req,res)=>{
    const {activeUser}=req.params;
    const client = new MongoClient(MONGO_URI, options);
try { 
    await client.connect();
    const db = client.db("SkinExpert");
    const data = await db.collection("Routine").find({user:activeUser}).toArray();
    if (data) {
        client.close();
        return(
        res.status(200).json({
        status: 200,
        data: data,
        })
        )
    } 
    else{
        client.close();
        return(
        res.status(400).json({
        status: 400
    }))
    }
} catch (err) {
    res.status(400).json({
        status: 400,
        message: "Bad Request",
    });
    }
}

module.exports = {
    addCurrentRoutine,getRoutine,deleteIteminBin,deleteIteminBin2,deleteCurrentRoutine,
    addMessage,addMessage2,
    getPosts,addPost
};
