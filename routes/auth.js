const express=require('express')
const router=express.Router()

//@route GET /api/auth
//@desription get logged in user
//@access Private
router.get('/',(req,res)=>{
    res.json({msg:'Get logged in user'})
})
//@route POST /api/auth
//@desription Auth user & get token
//@access Public
router.post('/',(req,res)=>{
    res.json({msg:'Log in user'})
})

module.exports=router