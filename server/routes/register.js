const router = require('express').Router()
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//user model
const User = require('../models/User')

router.post('/',
[
    check('name','please provide name').not().isEmpty(),
    check('email','please provide a valid email').isEmail(),
    check('password','please provide 6 characters long password').isLength({min:6})
],
async (req,res)=>{
    
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()})
    }   
    const {name, email,password} = req.body
    try {
      let user = await User.findOne({email})
      if(user){
          return res.status(400).json({msg:'user already exists'})
      }  
      user = new User({
          name,
          email,
          password
      })
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt )
      
      await user.save()

      const payload ={
          user:{
              id:user.id
          }
      }
      jwt.sign(payload, process.env.SECRET ,{
          expiresIn:3600
      }, (err, token)=>{
          if(err) throw err
          res.send({token})
      })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server Error')
    }
})

module.exports = router
