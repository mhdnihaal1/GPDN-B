import mongoose, { Schema, Document, Model, Types } from "mongoose";
import MembersAndPalliativeRepository from "../../InfrastructureLayer/repository/MembersAndPalliativeRepository/MembersAndPalliativeRepository";
import generateOtp from "../../InfrastructureLayer/services/GenerateOtp";
import EncryptPassword from "../../InfrastructureLayer/services/BcryptPassword";
import sendOtp from "../../InfrastructureLayer/services/SendEmail";
import {AppWriteOtp} from "../../InfrastructureLayer/services/AppWriteOtp";
// import {account} from "../../InfrastructureLayer/services/AppWriteOtp";
import JWTToken from "../../InfrastructureLayer/services/GenerateToken";


// import { Client, Account, ID } from "appwrite";
// import OtpSession from "../../DomainLayer/OtpSession";

// import IUser from "../../domainLayer/userDomain";
// import UserModel from "../../infrastructureLayer/database/UserModel";

class MemberAndPalliativeUsecase {
  private MembersAndPalliativeRepository: MembersAndPalliativeRepository;
  private generateOtp: generateOtp;
  private EncryptPassword: EncryptPassword;
  private JwtToken: JWTToken;
  private AppWriteOtp: AppWriteOtp;
  private generateEmail: sendOtp;

  constructor(
    MembersAndPalliativeRepository: MembersAndPalliativeRepository,
    generateOtp: generateOtp,
    EncryptPassword: EncryptPassword,
    jwtToken: JWTToken,
    AppWriteOtp:AppWriteOtp,
    generateEmail: sendOtp
  ) {
    this.MembersAndPalliativeRepository = MembersAndPalliativeRepository;
    this.generateOtp = generateOtp;
    this.EncryptPassword = EncryptPassword;
    this.JwtToken = jwtToken;
    this.AppWriteOtp = AppWriteOtp;
    this.generateEmail = generateEmail;
  }


  
  async FetchDoctorsForm(){
    try{
        const FetchDoctor = this.MembersAndPalliativeRepository.FetchDoctors();
        if(!FetchDoctor){
          return {
            success: false,
            status: 400,
            data:{
              message:"Failed to fetch doctor!."
            },
          };
        }else{
          return {
            success: true,
            status: 200,
            data:FetchDoctor,
          };
        }
       }catch(error){
      console.log(error)
    }
   }

   

   async SearchDoctorsForm( searchInp :string){
    try{
        const searchDoctor = this.MembersAndPalliativeRepository.SearchDoctor(searchInp);
        if(!searchDoctor){
          return {
            success: false,
            status: 400,
            data:{
              message:"Failed to search doctor! ,Please try later."
            },
          };
        }else{
          return {
            success: true,
            status: 200,
            data:searchDoctor,
          };
        }
    }catch(error){
      console.log(error)
    }
   }

   
   async filterDoctorsForm( filter :string){
    try{

        const filterDoctor = this.MembersAndPalliativeRepository.filterDoctors(filter);
        if(!filterDoctor){
          return {
            success: false,
            status: 400,
            data:{
              message:"please try again"
            },
          };
        }else{
          return {
            success: true,
            status: 200,
            data:filterDoctor,
          };
        } 
       }catch(error){
      console.log(error)
    }
   }

   
   async fetchPalliativeUnitForm(){
    try{

       const fetchPalliativeUnit = await this.MembersAndPalliativeRepository.fetchPalliativeUnit()
       if(!fetchPalliativeUnit){
          return {
            success: false,
            status: 400,
            data:{
              message:"Failed to fetch palliative unit!."
            },
          };
        }else{
          return {
            success: true,
            status: 200,
            data:fetchPalliativeUnit,
          };
        } 

    }catch(error){
      console.log(error)
    }
   }

   async addPalliativeUnitForm(name:string , location:string , services:string , contactDetails:string){
     try{

      const PalliativeUnit = { name , location , services , contactDetails};
      const addPalliativeUnit = await this.MembersAndPalliativeRepository.addPalliativeUnit(PalliativeUnit);
      if(!addPalliativeUnit){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to add palliative unit! ,Please try later."
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:addPalliativeUnit,
        };
      } 

     }catch(error){
      console.log(error)
     }
   }

   
   async editPalliativeUnitForm(name:string , location:string , services:string , contactDetails:string){
    try{

     const PalliativeUnit = { name , location , services , contactDetails};
     const editPalliativeUnit = await this.MembersAndPalliativeRepository.editPalliativeUnit(PalliativeUnit);
     if(!editPalliativeUnit){
      return {
        success: false,
        status: 400,
        data:{
          message:"Failed to edit palliative unit! ,Please try later."
        },
      };
    }else{
      return {
        success: true,
        status: 200,
        data:editPalliativeUnit,
      };
    } 
    }catch(error){
     console.log(error)
    }
  }

  
  async deletePalliativeUnitForm(UnitId:string){
    try{

     const deletePalliativeUnit = await this.MembersAndPalliativeRepository.deletePalliativeUnit(UnitId);
     if(!deletePalliativeUnit){
      return {
        success: false,
        status: 400,
        data:{
          message:"Failed to delete palliative unit! ,Please try later."
        },
      };
    }else{
      return {
        success: true,
        status: 200,
        data:deletePalliativeUnit,
      };
    } 
    }catch(error){
     console.log(error)
    }
  }


  async searchPalliativeUnitForm(searchInp:string){
    try{
     const searchPalliativeUnit = await this.MembersAndPalliativeRepository.searchPalliativeUnit(searchInp);
     if(!searchPalliativeUnit){
      return {
        success: false,
        status: 400,
        data:{
          message:"Failed to search palliative unit! ,Please try later."
        },
      };
    }else{
      return {
        success: true,
        status: 200,
        data:searchPalliativeUnit,
      };
    } 
    }catch(error){
     console.log(error)
    }
  }
}

export default MemberAndPalliativeUsecase;