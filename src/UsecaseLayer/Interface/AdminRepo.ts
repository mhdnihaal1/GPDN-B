import IBlog from "../../DomainLayer/BlogDomain.";
import IResource from "../../DomainLayer/ResourceDomain";
import IThread from "../../DomainLayer/ThreadsDomain";
import IUnit from "../../DomainLayer/UnitDomain";
import IUser from "../../DomainLayer/UserDomain";    


interface AdminRepo {

    findByEmail(email:string):Promise<IUser |any>;
    AddUser(addNewUser: IUser):Promise<IUser |any>;
    updateUser(update: IUser):Promise<IUser |any>;
    deleteUser(userId :string):Promise<IUser |any>;
    fetchUser():Promise<IUser |any>;
    fetchThread():Promise<IThread |any>;
    threadActionStatus(threadId :string , actionStatus:string): Promise<IThread | any>;
    editThread( thread:IThread): Promise<IThread | any>;
    deleteUserComment( threadId:string , userId :string): Promise<IThread | any>;
    deleteThread( threadId:string): Promise<IThread | any>;
    fetchResource(): Promise<IResource | any>;
    resourceActionStatus(resourceId :string , actionStatus:string): Promise<IResource | any>;
    fetchBlogs(): Promise<IBlog | any>;
    blogActionStatus(blogId :string , actionStatus:boolean): Promise<IBlog | any>;
    fetchPalliative(): Promise<IUnit | any>;
    addPalliative(unit:IUnit): Promise<IUnit | any>;
    editPalliative(unit:IUnit): Promise<IUnit | any>;
    removePalliative(unitId:string): Promise<IUnit | any>;
    LastDayUserRegistration(): Promise<IUnit | any>;
    LastWeekUserRegistration(): Promise<IUnit | any>;
    LastMonthUserRegistration(): Promise<IUnit | any>;
    LastDayResource(): Promise<IUnit | any>;
    LastWeekResource(): Promise<IUnit | any>;
    LastMonthResource(): Promise<IUnit | any>;
    LastDayNewsAndBlogs(): Promise<IUnit | any>;
    LastWeekNewsAndBlogs(): Promise<IUnit | any>;
    LastMonthNewsAndBlogs(): Promise<IUnit | any>;
    LastDayThread(): Promise<IUnit | any>;
    LastWeekThread(): Promise<IUnit | any>;
    LastMonthThread(): Promise<IUnit | any>;
    TotalUsers(): Promise<IUnit | any>;
    TotalThreads(): Promise<IUnit | any>;
    TotalResources(): Promise<IUnit | any>;
    TotalNewsAndBlogs(): Promise<IUnit | any>;
    TopLikedThreads(): Promise<IUnit | any>;
    TopLikedResources(): Promise<IUnit | any>;
    TopLikedNewsAndBlogs(): Promise<IUnit | any>;




  
}

export default AdminRepo;