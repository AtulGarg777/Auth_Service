const Joi=require('joi');

const signupValidation=(req,res,next)=>{
    const schema=Joi.object({
        name:Joi.string().min(3).max(50).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(20).required()
    })
 
    const {error}=schema.validate(req.body);
    if(error){
        res.status(400).json({message:'bad request',error});
    }
    next();
}

module.exports={signupValidation};