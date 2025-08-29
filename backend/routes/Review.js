const express=require('express')
const reviewController=require("../controllers/Review")
const router=express.Router()


router
    .post("/",reviewController.create)
    .get('/product/:slug',reviewController.getByproductSlug)
    .patch('/:slug',reviewController.updateById)
    .delete("/:slug",reviewController.deleteById)
    .patch('/:id',reviewController.updateById)
    .delete("/:id",reviewController.deleteById)
    .get('/:id',reviewController.getById)
    
module.exports=router