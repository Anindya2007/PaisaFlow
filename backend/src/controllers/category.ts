import {Request,Response} from 'express';
import { getCategories, createCategoryService, CategoryUpdate} from '../services/category.js';


// ========================== Get all categories ==================================
export const getAllCategories=async (req:Request,res:Response)=>{
    try{
        const categories=await getCategories();

        if (!categories){
            return res.status(201).json({message:"No category found !! Please made new one"})
        };

        return res.status(200).json({message:'Categories fetched successfully',success:true,data:categories});

    }catch(error){
        console.log(error);
        return res.status(500).json({message:'Internal server error',success:false});
    }
}   



// ========================== Create category ==================================
export const createCategory=async (req:Request,res:Response)=>{
    try{
        const {categoryName}=req.body;
        if(!categoryName){
            return res.status(400).json({message:'Category name is required',success:false});
        }
        const category=await createCategoryService(categoryName);
        return res.status(200).json({message:'Category created successfully',success:true,data:category});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:'Internal server error',success:false});
    }
}   




// ========================== Update category ==================================
export const updateCategory=async (req:Request,res:Response)=>{
    try{
        //Checking wether user is loggedin or not for security
        if (!req.authUser){
            return res.status(401).json({message:'Unauthorized',success:false});
        }

        const name = req.params.name as string;
        const {categoryName}=req.body;

        if(!name){ //For the scenario when new name is not provided
            return res.status(400).json({message:'Category name is required',success:false});
        }

        const category=await CategoryUpdate(categoryName,name);

        return res.status(200).json({message:'Category updated successfully',success:true,data:category});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:'Internal server error',success:false});
    }
}   