import IResource from "../../../DomainLayer/ResourceDomain";
import ResourceRepo from "../../../UsecaseLayer/Interface/ResourceRepo";
import ResourceSchema from "../../database/ResourceSchema";


class ResourceRepository implements ResourceRepo {



    async fetchResources(): Promise<IResource | any> {
        try {
          const Resources = await ResourceSchema.find();
          return Resources;
        } catch (error) {
          console.log(error);
          return error;
        }
      }
      

      async addResources(resource:IResource): Promise<IResource | any> {
        try {
            const newResource = new ResourceSchema(resource);
            const savedResource = await newResource.save();
          return savedResource;
        } catch (error) {
          console.log(error);
          return error;
        }
      }
      

      async editResources(resource:IResource): Promise<IResource | any> {
        try {
            const savedResource = await ResourceSchema.findByIdAndUpdate(
                resource._id,
                { $set: { ...resource } },
                { new: true }
              );
            return savedResource;
        } catch (error) {
          console.log(error);
          return error;
        }
      }
      

      async deleteResources(resourceId:string): Promise<IResource | any> {
        try {
            const savedResource = await ResourceSchema.findByIdAndDelete(resourceId);
            return savedResource;
        } catch (error) {
          console.log(error);
          return error;
        }
      }

      


      async findResourcesById(resourceId:string ): Promise<IResource | any> {
        try {
            const Resource = await ResourceSchema.findOne({ _id : resourceId });
          return Resource;
        } catch (error) {
          console.log(error);
          return error;
        }
      }

     
 

      
}


export default ResourceRepository;