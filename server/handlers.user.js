const { MongoClient } = require("mongodb");
const { userInfo } = require("os");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

require("dotenv").config();
const { MONGO_URI } = process.env;
//get specific user
const getUser=async(req,res)=>{
    const {name} =req.params;
    const query={name:name};
    const client = new MongoClient(MONGO_URI, options);
try {
    await client.connect();
    const db = client.db("SkinExpert");
    const data = await db.collection("Users").find(query).toArray();
    if (data.length!=0) {
        res.status(200).json({
        status: 200,
        message:"Success",
        data: data,
        });
    }else{
        res.status(200).json({
            status: 200,
            message:"Invalid User",
            data: data,
        })
    } 
} catch (err) {
    res.status(400).json({
        status: 400,
        message: "Bad Request",
    });
    }
    client.close();
}
//adding a new user 
const addUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        const newItem = req.body;
        await client.connect();
        const db = client.db("SkinExpert");
        await db.collection("Users").insertOne(newItem);
        client.close();
        return res.status(200).json({
            status: 200,
            message: "Success",
            data: newItem,
        });
    } catch (err) {
        return res.status(400).json({ status: 400, message: "Invalid data!" });
    }
};
//updating user information
const updateUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const name = req.params.name;
    const query = { name};
    const updatedOrder = { $set: { ...req.body } };

    await client.connect();
    const db = client.db("SkinExpert");

    if (name != null) {
      await db.collection("Users").updateOne(query, updatedOrder);
      res.status(200).json({ status: 200, ...req.body });
    } else {
      res.status(400).json({ status: 400, message: "Error!" });
    }
    client.close();
  } catch {
    return res.status(400).json({ status: 400, message: "Invalid data!" });
  }
};



module.exports = {
    getUser,addUser,updateUser
};


