import prisma from '../config/db.js';

// ========================== Get all categories ==================================
export const getCategories= async ()=>{
    try{
        const categories=await prisma.category.findMany({
            select:{
                name:true
            }});
        
        if (!categories){
            return null;
        }

        return categories;

    }catch(error){
        console.log(error);
        return null;
    }
};


// ========================== Create category ==================================
export const createCategoryService = async (categoryName: string) => {
    try {
        const category = await prisma.category.create({
            data: { name: categoryName }
        });
        return category;
    } catch (error) {
        console.log(error);
        return null;
    }
};


// ========================== Category update ==================================
export const CategoryUpdate = async (categoryName:string,name:string)=>{
    try{
        const updatedCategory=await prisma.category.update({
            where:{name:categoryName},
            data:{name}
        });

        if (!updatedCategory){
            return null;
        };

        return updatedCategory;
    }catch(error){
        console.log(error);
        return null;
    }
}
