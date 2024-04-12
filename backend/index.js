const cors = require("cors")
require('dotenv').config();
const express = require("express")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require('uuid');

const app = express();

//middleware
app.use(express.json())
app.use(cors())

//routes
app.get("/",(req,res)=>{
    res.send("It works!")
})

app.post("/payment",(req,res)=>{
    const {product, token} = req.body;
    console.log("PRODUCT", product);
    console.log("PRICE", product.price);
    const idempotencyKey = uuid();

    return stripe.customers.create({
        email:token.email,
        source: token.id
    }).then(customer =>{
        stripe.charges.create({
            amount: product.price * 100, //cents to dollars
            currency: 'usd',
            customer: customer.id, 
            receipt_email: token.email,
            description: `purchase of ${product.name}`,
            shipping:{
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        }, {idempotencyKey})
    })
    .then(result=>res.status(200).json(result))
    .catch(err=>console.log(err))
})

//listen

app.listen(9000,()=>console.log("Listening at port 9000"))