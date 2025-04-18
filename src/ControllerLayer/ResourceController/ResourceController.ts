import { Request, Response, NextFunction } from "express";
import ResourceUsecase from "../../UsecaseLayer/ResourceUsecase/ResourceUsecase";

class ResourceController {
  private ResourceUsecase: ResourceUsecase;

  constructor(ResourceUsecase: ResourceUsecase) {
    this.ResourceUsecase = ResourceUsecase;
  }


  async fetchResource(req: Request, res: Response, next: NextFunction){
    try{
      

      const fetchResource =await  this.ResourceUsecase.FetchResourceForm()
      return res.json({
        success: fetchResource?.success,
        status: fetchResource?.status,
        data: fetchResource?.data,
      });
    }catch(error){
      console.log(error)
    }
  }

  async AddResource(req: Request, res: Response, next: NextFunction){
    try{
     
      const { title , description , fileURL , authorId , category} = req.body;

      const addResources =await this.ResourceUsecase.AddResourceForm( title , description , fileURL , authorId , category )
      return res.json({
        success: addResources?.success,
        status: addResources?.status,
        data: addResources?.data,
      });      
    }catch(error){
      console.log(error)
    }
  }

  async EditResource(req: Request, res: Response, next: NextFunction){
    try{

      const { title , description , fileURL , authorId , category} = req.body;

      const editResources =await this.ResourceUsecase.EditResourceForm( title , description , fileURL , authorId , category )
      return res.json({
        success: editResources?.success,
        status: editResources?.status,
        data: editResources?.data,
      });      
    }catch(error){
      console.log(error)
    }
  }

  async DeleteResource(req: Request, res: Response, next: NextFunction){
    try{

      const { resourceId } = req.body;
       const deleteResource = await this.ResourceUsecase.DeleteResourceForm(resourceId)
       return res.json({
        success: deleteResource?.success,
        status: deleteResource?.status,
        data: deleteResource?.data,
      });
    }catch(error){
      console.log(error)
    }
  }

  async ResourceLike(req: Request, res: Response, next: NextFunction){
    try{

      const { resourceId , userId } = req.body;

      const resourceLike = await this.ResourceUsecase.ResourceLikeForm( resourceId , userId);

      return res.json({
        success: resourceLike?.success,
        status: resourceLike?.status,
        data: resourceLike?.data,
      });      
    }catch(error){
      console.log(error)
    }
  }

  async ResourceDislike(req: Request, res: Response, next: NextFunction){
    try{

      const { resourceId , userId } = req.body;

      const resourceDislike = await this.ResourceUsecase.ResourceDislikeForm( resourceId , userId );

      return res.json({
        success: resourceDislike?.success,
        status: resourceDislike?.status,
        data: resourceDislike?.data,
      });      
    }catch(error){
      console.log(error)
    }
  }


}

export default ResourceController;