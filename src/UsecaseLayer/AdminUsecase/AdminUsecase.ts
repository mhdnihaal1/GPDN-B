import mongoose, { Schema, Document, Model, Types } from "mongoose";
import AdminRepository from "../../InfrastructureLayer/repository/AdminRepository/AdminRepository";
import generateOtp from "../../InfrastructureLayer/services/GenerateOtp";
import EncryptPassword from "../../InfrastructureLayer/services/BcryptPassword";
import sendOtp from "../../InfrastructureLayer/services/SendEmail";
import {AppWriteOtp} from "../../InfrastructureLayer/services/AppWriteOtp";
// import {account} from "../../InfrastructureLayer/services/AppWriteOtp";
import JWTToken from "../../InfrastructureLayer/services/GenerateToken";
import IUser from "../../DomainLayer/UserDomain";
import SendEmail from "../../InfrastructureLayer/services/SendEmail";


// import { Client, Account, ID } from "appwrite";
// import OtpSession from "../../DomainLayer/OtpSession";

// import IUser from "../../domainLayer/userDomain";
// import UserModel from "../../infrastructureLayer/database/UserModel";

class AdminUsecase {
  private AdminRepository: AdminRepository;
  private generateOtp: generateOtp;
  private EncryptPassword: EncryptPassword;
  private JwtToken: JWTToken;
  private AppWriteOtp: AppWriteOtp;
  private sendEmail: SendEmail;

  constructor(
    AdminRepository: AdminRepository,
    generateOtp: generateOtp,
    EncryptPassword: EncryptPassword,
    jwtToken: JWTToken,
    AppWriteOtp:AppWriteOtp,
    sendEmail: SendEmail
  ) {
    this.AdminRepository = AdminRepository;
    this.generateOtp = generateOtp;
    this.EncryptPassword = EncryptPassword;
    this.JwtToken = jwtToken;
    this.AppWriteOtp = AppWriteOtp;
    this.sendEmail = sendEmail;
  }

  async adminInvitationForm(email:string){
    try{

      this.sendEmail.sendInvitationToUser(email);
      return {
        success: true,
        status: 200,
        data: {
          message: "email sended successfully.",
        },
      };
    }catch(error){
      console.log(error)
    }
  }

  
  async userActionStatusForm(userId:string , actionStatus:string){
    try{
      
      const ActionStatus = await this.AdminRepository.userActionStatus(userId , actionStatus)
      if(!ActionStatus){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to change user action! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:ActionStatus,
        };
      }

    }catch(error){
      console.log(error)
    }
  }
  
  async createUserForm(
    fullName: string,
    email: string,
    phoneNumber: string,
    photo: string,
    bio: string,
    countryOfPractice: string,
    medicalQualification: string,
    yearOfGraduation: number,
    hasFormalTrainingInPalliativeCare: boolean,
    medicalRegistrationAuthority: string,
    medicalRegistrationNumber: string,
    affiliatedPalliativeAssociations: string,
    specialInterestsInPalliativeCare: string,
    role: string,
    password: string
    ) {
    try {
      const ExistingUser = await this.AdminRepository.findByEmail(email);

      if (ExistingUser && ExistingUser?.registrationStatus == "pending") {
        return {
          success: false,
          status: 400,
          data: {
            message: "User request already send to  admin.",
          },
        };
      } else if (
        ExistingUser &&
        ExistingUser?.registrationStatus == "approved"
      ) {
        return {
          success: false,
          status: 400,
          data: {
            message: "User already exists.",
          },
        };
      } else if (
        ExistingUser &&
        ExistingUser?.registrationStatus == "rejected"
      ) {
        return {
          success: false,
          status: 400,
          data: {
            message: "Admin rejected user already. ",
          },
        };
      }
      const hashPass = await this.EncryptPassword.encryptPassword(password)


      const data = {
        fullName,
        email,
        phoneNumber,
        photo,
        bio,
        countryOfPractice,
        medicalQualification,
        yearOfGraduation,
        hasFormalTrainingInPalliativeCare,
        medicalRegistrationAuthority,
        medicalRegistrationNumber,
        affiliatedPalliativeAssociations,
        specialInterestsInPalliativeCare,
        role ,
        password:hashPass
       };

       

      const addNewUser: IUser = { ...data };

      const newUser = await this.AdminRepository.AddUser(addNewUser);

    
      return {
        success: true,
        status: 200,
        data:{
          message: "User send to  admin and created successfully.",
          data:newUser
        },
      };
     
    } catch (error) {
      console.log(error);
    }
  }
  
  

  async updateUserForm(
    _id:string,
    fullName: string,
    email: string,
    phoneNumber: string,
    photo: string,
    bio: string,
    countryOfPractice: string,
    medicalQualification: string,
    yearOfGraduation: number,
    hasFormalTrainingInPalliativeCare: boolean,
    medicalRegistrationAuthority: string,
    medicalRegistrationNumber: string,
    affiliatedPalliativeAssociations: string,
    specialInterestsInPalliativeCare: string,
    role: string,
    password: string,
   ) {
    try {
     
 
const hashPass = await this.EncryptPassword.encryptPassword(password)
      const data = {
        _id,
        fullName,
        email,
        phoneNumber,
        photo,
        bio,
        countryOfPractice,
        medicalQualification,
        yearOfGraduation,
        hasFormalTrainingInPalliativeCare,
        medicalRegistrationAuthority,
        medicalRegistrationNumber,
        affiliatedPalliativeAssociations,
        specialInterestsInPalliativeCare,
        role,
        password:hashPass,
       };



      const update: IUser = { ...data };

      const updatedUser = await this.AdminRepository.updateUser(update);

      if(!updatedUser){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to edit user! ,Please try later."
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:{
            message: "User updated successfully.",
            data:updatedUser
          },
        };
      } 
     
    } catch (error) {
      console.log(error);
    }
  }

  

  async deleteUserForm(userId : string){
    try{
      
      const deleteUser = await this.AdminRepository.deleteUser(userId)
      if(!deleteUser){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to delete user! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:deleteUser,
        };
      } 
    }catch(error){
      console.log(error)
    }
  }

  async fetchUserForm(){
    try{
      
      const fetchUser = await this.AdminRepository.fetchUser()
      if(!fetchUser){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to fetch user! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:fetchUser,
        };
      } 

    }catch(error){
      console.log(error)
    }
  }

  
  async fetchThreadForm(){
    try{
      
      const fetchThread = await this.AdminRepository.fetchThread()
      if(!fetchThread){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to fetch thread! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:fetchThread,
        };
      }

    }catch(error){
      console.log(error)
    }
  }

  

  async threadActionStatusForm(threadId:string , actionStatus:string){
    try{
      
      const ActionStatus = await this.AdminRepository.threadActionStatus(threadId , actionStatus)
      if(!ActionStatus){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to change action! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:ActionStatus,
        };
      }

    }catch(error){
      console.log(error)
    }
  }

  async editThreadForm(_id:string ,title:string, content:string, tags:string[] ){
    try{
      const thread = { _id ,title , content , tags }
console.log(thread)
      const editThread = await this.AdminRepository.editThread(thread)
      if(!editThread){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to edit thread! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:editThread,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  
  async deleteUserCommentForm(threadId:string , commentId:string ){
    try{


      const deleteuserComment = await this.AdminRepository.deleteUserComment(threadId , commentId )
      if(!deleteuserComment){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to delete user comment! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:deleteuserComment,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  
  async deleteThreadForm(threadId:string ){
    try{


      const deleteThread = await this.AdminRepository.deleteThread(threadId )
      if(!deleteThread){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to delete thread! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:deleteThread,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  async fetchResourcesForm(){
    try{
      const fetchResource = await this.AdminRepository.fetchResource()
      if(!fetchResource){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to fetch resource! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:fetchResource,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  async resourceActionStatusForm(resourceId:string , actionStatus:string){
    try{
      
      const ActionStatus = await this.AdminRepository.resourceActionStatus(resourceId , actionStatus)
      if(!ActionStatus){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to change  action! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:ActionStatus,
        };
      }

    }catch(error){
      console.log(error)
    }
  }

  
  async AddNewsAndBlogsForm(title:string , content:string , authorId:string , tags:[string] , description:string , imageURL:string, category:string ){
    try{
      const NewsAndBlogs = {title , content ,description , tags , authorId , imageURL , category } ;
      if (!authorId || !title || !content || !tags || !description || !imageURL || !category) {
        return { success: false, status:400 ,data:{Message:"Please fill all required feilds." } };
      }
        const addNewsAndBlogs =await  this.AdminRepository.addNewsAndBlogs(NewsAndBlogs);
        if(!addNewsAndBlogs){
          return {
            success: false,
            status: 400,
            data:{
              message:"Failed to add newsandblogs! ,Please try later."
            },
          };
        }else{
          return {
            success: true,
            status: 200,
            data:addNewsAndBlogs,
          };
        }
    }catch(error){
      console.log(error)
    }
   }

   
   async editNewsAndBlogsForm(_id:string ,title:string , content:string , tags:[string] , description:string , category:string , imageURL:string){
    try{
        const NewsAndBlogs = {_id ,title , content , tags , description , imageURL , category}
        if (!_id || !title || !content || !tags || !description || !imageURL || !category) {
          return { success: false, status:400 ,message: "Please fill all required feilds." };
        }
        
        const editNewsAndBlogs =await  this.AdminRepository.editNewsAndBlogs(NewsAndBlogs);
        console.log(editNewsAndBlogs)
        if(!editNewsAndBlogs){
          return {
            success: false,
            status: 400,
            data:{
              message:"Failed to edit newsandblogs! ,Please try later."
            },
          };
        }else{
          return {
            success: true,
            status: 200,
            data:editNewsAndBlogs,
          };
        }
    }catch(error){
      console.log(error)
    }
   }
   
   async deleteNewsAndBlogsForm( BlogId:string){
    try{
        const deleteNewsAndBlogs =await  this.AdminRepository.deleteNewsAndBlogs(BlogId);
        if(!deleteNewsAndBlogs){
          return {
            success: false,
            status: 400,
            data:{
              message:"Failed to add newsandblogs! ,Please try later."
            },
          };
        }else{
          return {
            success: true,
            status: 200,
            data:deleteNewsAndBlogs,
          };
        }
    }catch(error){
      console.log(error)
    }
   }
  

  async fetchBlogsForm(){
    try{
      const fetchBlogs = await this.AdminRepository.fetchBlogs()
      if(!fetchBlogs){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to fetch blog! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:fetchBlogs,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  

  
  async blogActionStatusForm(_id:string , actionStatus:boolean){
    try{


      const ActionStatus = await this.AdminRepository.blogActionStatus(_id , actionStatus)
      if(!ActionStatus){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to change action! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:ActionStatus,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  async fetchCategoryForm(){
    try{


      const fetchCategory = await this.AdminRepository.fetchCategory()
      if(!fetchCategory){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to fetch category! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:fetchCategory,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  async addCategoryForm( categroy:string ){
    try{
      const addCategory = await this.AdminRepository.addCategory(categroy)
      if(!addCategory){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to add category! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:addCategory,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  async editCategoryForm(_id:string , categroy:string ){
    try{
      const editCategory = await this.AdminRepository.editCategory(_id , categroy)
      if(!editCategory){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to edit category! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:editCategory,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  async deleteCategoryForm( _id:string ){
    try{
      const deleteCategory = await this.AdminRepository.deleteCategory(_id)
      if(!deleteCategory){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to delete category! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:deleteCategory,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  
  async fetchPalliativeForm(){
    try{

      const fetchPalliative = await this.AdminRepository.fetchPalliative()
      if(!fetchPalliative){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to fetch palliative unit! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:fetchPalliative,
        };
      }
    }catch(error){
      console.log(error)
    }
  }


  async addPalliativeForm( name:string , location:string , services:string , contactDetails:string ){
    try{

       const unit = {name , location , services , contactDetails}
       const addPalliative = await this.AdminRepository.addPalliative(unit)
      if(!addPalliative){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to add palliative unit! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:addPalliative,
        };
      }
    }catch(error){
      console.log(error)
    }
  }
  

  async editPalliativeForm(_id:string , name:string , location:string , services:string , contactDetails:string ){
    try{

       const unit = {_id , name , location , services , contactDetails}
      const editPalliative = await this.AdminRepository.editPalliative(unit)
      if(!editPalliative){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to edit palliative unit! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:editPalliative,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  
  async removePalliativeForm(unitid:string){
    try{

      const removePalliative = await this.AdminRepository.removePalliative(unitid)
      if(!removePalliative){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to remove palliative unit! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:removePalliative,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  async LastDayUserRegistrationForm(){
    try{

      const LastDayUserRegistration = await this.AdminRepository.LastDayUserRegistration()
      if(!LastDayUserRegistration){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to fetch last day userRegistration! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:LastDayUserRegistration,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  async LastWeekUserRegistrationForm(){
    try{

      const LastWeekUserRegistration = await this.AdminRepository.LastWeekUserRegistration()
      if(!LastWeekUserRegistration){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to fetch last week userRegistration! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:LastWeekUserRegistration,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  async LastMonthUserRegistrationForm(){
    try{

      const LastMonthUserRegistration = await this.AdminRepository.LastMonthUserRegistration()
      if(!LastMonthUserRegistration){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to fetch last month userRegistration! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:LastMonthUserRegistration,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  async LastDayResourceForm(){
    try{

      const LastDayResource = await this.AdminRepository.LastDayResource()
      if(!LastDayResource){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to fetch last day resource! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:LastDayResource,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  async LastWeekResourceForm(){
    try{

      const LastWeekResource = await this.AdminRepository.LastWeekResource()
      if(!LastWeekResource){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to fetch last week resource! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:LastWeekResource,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  async LastMonthResourceForm(){
    try{

      const LastMonthResource = await this.AdminRepository.LastMonthResource()
      if(!LastMonthResource){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to fetch last month resource! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:LastMonthResource,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  async LastDayNewsAndBlogsForm(){
    try{

      const LastDayNewsAndBlogs = await this.AdminRepository.LastDayNewsAndBlogs()
      if(!LastDayNewsAndBlogs){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to fetch last day NewsAndBlogs! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:LastDayNewsAndBlogs,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  async LastWeekNewsAndBlogsForm(){
    try{

      const LastWeekNewsAndBlogs = await this.AdminRepository.LastWeekNewsAndBlogs()
      if(!LastWeekNewsAndBlogs){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to fetch last week NewsAndBlogs! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:LastWeekNewsAndBlogs,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  async LastMonthNewsAndBlogsForm(){
    try{

      const LastMonthNewsAndBlogs = await this.AdminRepository.LastMonthNewsAndBlogs()
      if(!LastMonthNewsAndBlogs){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to fetch last month NewsAndBlogs! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:LastMonthNewsAndBlogs,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  async LastDayThreadForm(){
    try{

      const LastDayThread = await this.AdminRepository.LastDayThread();
      console.log(LastDayThread)
      if(!LastDayThread){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to fetch last day Thread! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:LastDayThread,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  async LastWeekThreadForm(){
    try{

      const LastWeekThread = await this.AdminRepository.LastWeekThread()
      if(!LastWeekThread){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to fetch last week Thread! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:LastWeekThread,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  async LastMonthThreadForm(){
    try{

      const LastMonthThread = await this.AdminRepository.LastMonthThread()
      if(!LastMonthThread){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to fetch last month Thread! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:LastMonthThread,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  async TotalUsersForm(){
    try{

      const TotalUsers = await this.AdminRepository.TotalUsers()
      if(!TotalUsers){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to fetch total users ! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:TotalUsers,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  async TotalThreadsForm(){
    try{

      const TotalThreads = await this.AdminRepository.TotalThreads()
      if(!TotalThreads){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to fetch total Threads! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:TotalThreads,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  async TotalResourcesForm(){
    try{

      const TotalResources = await this.AdminRepository.TotalResources()
      if(!TotalResources){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to fetch total Resources! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:TotalResources,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  async TotalNewsAndBlogsForm(){
    try{

      const TotalNewsAndBlogs = await this.AdminRepository.TotalNewsAndBlogs()
      if(!TotalNewsAndBlogs){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to fetch total NewsAndBlogs! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:TotalNewsAndBlogs,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  async TopLikedThreadsForm(){
    try{

      const TopLikedThreads = await this.AdminRepository.TopLikedThreads()
      if(!TopLikedThreads){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to fetch top liked Threads! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:TopLikedThreads,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  async TopLikedResourcesForm(){
    try{

      const TopLikedResources = await this.AdminRepository.TopLikedResources()
      if(!TopLikedResources){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to fetch top liked Resources! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:TopLikedResources,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

  async TopLikedNewsAndBlogsForm(){
    try{

      const TopLikedNewsAndBlogs = await this.AdminRepository.TopLikedNewsAndBlogs()
      if(!TopLikedNewsAndBlogs){
        return {
          success: false,
          status: 400,
          data:{
            message:"Failed to fetch top liked NewsAndBlogs! ,Please try later"
          },
        };
      }else{
        return {
          success: true,
          status: 200,
          data:TopLikedNewsAndBlogs,
        };
      }
    }catch(error){
      console.log(error)
    }
  }

}

export default AdminUsecase;