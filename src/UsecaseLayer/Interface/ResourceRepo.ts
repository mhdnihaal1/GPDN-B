import IResource from "../../DomainLayer/ResourceDomain";
import IUser from "../../DomainLayer/UserDomain";    


interface ResourceRepo {

    fetchResources(): Promise<string | any> ;
    addResources(resource:IResource): Promise<IResource | any> ;
    editResources(resource:IResource): Promise<IResource | any> ;
    deleteResources(resourceId:string): Promise<IResource | any> ;
    findResourcesById(resourceId:string ): Promise<IResource | any> ;

  
}

export default ResourceRepo;