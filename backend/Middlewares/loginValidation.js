const Joi=require('joi');

const loginValidation=(req,res,next)=>{
    const schema=Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(20).required()
    })

    const {error}=schema.validate(req.body);
    if(error){
        res.status(400).json({message:'bad request',error});
    }
    next();
}

module.exports=loginValidation;