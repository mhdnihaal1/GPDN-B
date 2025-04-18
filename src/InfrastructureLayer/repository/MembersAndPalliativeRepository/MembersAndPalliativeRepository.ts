import IUnit from "../../../DomainLayer/UnitDomain";
import IUser from "../../../DomainLayer/UserDomain";
import MembersAndPalliativeRepo from "../../../UsecaseLayer/Interface/MembersAndPalliativeRepo";
import UnitSchema from "../../database/UnitSchema.";
import UserSchema from "../../database/UserSchema";


class MembersAndPalliativeRepository implements MembersAndPalliativeRepo {



    async FetchDoctors():Promise<IUser | any>{
       try{
        const FetchDoctors = await UserSchema.find();
        return FetchDoctors;
       }catch(error){
        console.log(error)
       }
    }

    
    async SearchDoctor(searchInp:string):Promise<IUser | any>{
        try{
           
         const searchDoctors = await UserSchema.find({
            fullName: { $regex: searchInp, $options: "i" },
          });
          
         return searchDoctors;
        }catch(error){
         console.log(error)
        }
     }

     
     async filterDoctors(filter:string):Promise<IUser | any>{
        try{
           
         const filterDoctors = await UserSchema.find({fullName:filter});
         return filterDoctors;
        }catch(error){
         console.log(error)
        }
     }

     
     async fetchPalliativeUnit():Promise<IUnit | any>{
        try{
           
         const fetchPalliativeUnit = await UnitSchema.find();
         return fetchPalliativeUnit;

        }catch(error){
         console.log(error)
        }
     }
     

     async addPalliativeUnit(PalliativeUnit:IUnit):Promise<IUnit | any>{
        try{
           
            const newPalliativeUnit = new UnitSchema(PalliativeUnit);
            const savedPalliativeUnit = await newPalliativeUnit.save();
          return savedPalliativeUnit;

        }catch(error){
         console.log(error)
        }
     }

     
     async editPalliativeUnit(PalliativeUnit:IUnit):Promise<IUnit | any>{
        try{
           
            const editPalliativeUnit = await UnitSchema.findByIdAndUpdate(
                PalliativeUnit._id,
                { $set: { ...PalliativeUnit } },
                { new: true }
              );
          return editPalliativeUnit;

        }catch(error){
         console.log(error)
        }
     }

     
     async deletePalliativeUnit(UnitId:string):Promise<IUnit | any>{
        try{
           
         const deletePalliativeUnit = await UnitSchema.findByIdAndDelete(UnitId);
          return deletePalliativeUnit;

        }catch(error){
         console.log(error)
        }
     }

     

     async searchPalliativeUnit(searchInp:string):Promise<IUnit | any>{
        try{
           

            const searchPalliativeUnit = await UnitSchema.find({
                $or: [
                  { name: { $regex: searchInp, $options: "i" } },
                  { location: { $regex: searchInp, $options: "i" } },
                  { services: { $regex: searchInp, $options: "i" } }
                ]
              });

           return searchPalliativeUnit;

        }catch(error){
         console.log(error)
        }
     }


}

export default MembersAndPalliativeRepository;