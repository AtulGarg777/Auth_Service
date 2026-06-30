const router = require('express').Router();
const ProductAuth=require('../Middlewares/ProductAuth');

router.get('/',ProductAuth, (req, res) => {
    res.status(201).json([
        {
            name: "TV",
            price: 5000
        },
        {
            name: "Mbile",
            price: 15000
        }
    ])
});

module.exports=router;