import { Request, Response, NextFunction } from "express";
import NewsAndBlogsUsecase from "../../UsecaseLayer/NewsAndBlogsUsecase/NewsAndBlogsUsecase";

class NewsAndBlogsController {
  private NewsAndBlogsUsecase: NewsAndBlogsUsecase;

  constructor(NewsAndBlogsUsecase: NewsAndBlogsUsecase) {
    this.NewsAndBlogsUsecase = NewsAndBlogsUsecase;
  }


  async FetchNewsAndBlogs(req: Request, res: Response, next: NextFunction){
    try{
       console.log(" You are on FetchNewsAndBlogs")
      const fetchNewsAndBlogs = await this.NewsAndBlogsUsecase.FetchNewsAndBlogsForm()
      return res.json({
        success: fetchNewsAndBlogs?.success,
        status: fetchNewsAndBlogs?.status,
        data: fetchNewsAndBlogs?.data,
      });       
    }catch(error){
      console.log(error)
    }
  }

  async FetchNewsAndBlogsById(req:Request , res:Response , next: NextFunction){
    try{

      const { _id } = req.body;
      const fetchNewsAndBlogs = await this.NewsAndBlogsUsecase.FetchNewsAndBlogsByIdForm(_id)

      return res.json({
        success: fetchNewsAndBlogs?.success,
        status: fetchNewsAndBlogs?.status,
        data: fetchNewsAndBlogs?.data,
      });

      
    }catch(error){
      console.log(error)
    }
  }

  async AddNewsAndBlogs(req: Request, res: Response, next: NextFunction){
    try{
       const { title , content ,description , authorId , tags  , imageURL , category} = req.body;
      const AddNewsAndBlogs = await this.NewsAndBlogsUsecase.AddNewAndBlogsForm(title , content , authorId, tags , description , imageURL , category)
      return res.json({
        success: AddNewsAndBlogs?.success,
        status: AddNewsAndBlogs?.status,
        data: AddNewsAndBlogs?.data,
      }); 
    }catch(error){
      console.log(error)
    }
  }

  async EditNewsAndBlogs(req: Request, res: Response, next: NextFunction){
    try{
      
      const {_id , title , content ,description, tags , imageURL , category  } = req.body;

      const editNewsAndBlogs =await this.NewsAndBlogsUsecase.EditNewsAndBlogsForm( _id , title , content ,description, tags , imageURL , category)
      return res.json({
        success: editNewsAndBlogs?.success,
        status: editNewsAndBlogs?.status,
        data: editNewsAndBlogs?.data,
      }); 
    }catch(error){
      console.log(error)
    }
  }

  async DeleteNewsAndBlogs(req: Request, res: Response, next: NextFunction){
    try{
      
      const { BlogId } = req.body;
      const deleteNewsAndBlogs = await this.NewsAndBlogsUsecase.DeleteNewsAndBlogsForm(BlogId)
      return res.json({
        success: deleteNewsAndBlogs?.success,
        status: deleteNewsAndBlogs?.status,
        data: deleteNewsAndBlogs?.data,
      }); 
    }catch(error){
      console.log(error)
    }
  }

  
  async SearchNewsAndBlogs(req: Request, res: Response, next: NextFunction){
    try{

      const {searchInp} = req.body;

      const searchNewsAndBlogs = await this.NewsAndBlogsUsecase.SearchNewsAndBlogsForm(searchInp)
      return res.json({
        success: searchNewsAndBlogs?.success,
        status: searchNewsAndBlogs?.status,
        data: searchNewsAndBlogs?.data,
      });       
    }catch(error){
      console.log(error)
    }
  }

  
  async filterNewsAndBlogs(req: Request, res: Response, next: NextFunction){
    try{

      const {topic} = req.body;
 
      const filterNewsAndBlogs = await this.NewsAndBlogsUsecase.FilterNewsAndBlogsForm(topic)
      return res.json({
        success: filterNewsAndBlogs?.success,
        status: filterNewsAndBlogs?.status,
        data: filterNewsAndBlogs?.data,
      });       
    }catch(error){
      console.log(error)
    }
  }


  async NewsAndBlogsLike(req: Request, res: Response, next: NextFunction){
    try{
      
      const { BlogId , userId } = req.body;

      const resourceLike = await this.NewsAndBlogsUsecase.NewsAndBlogsLikeForm( BlogId , userId);
      return res.json({
        success: resourceLike?.success,
        status: resourceLike?.status,
        data: resourceLike?.data,
      }); 
    }catch(error){
      console.log(error)
    }
  }

  async NewsAndBlogsDislike(req: Request, res: Response, next: NextFunction){
    try{

      const { BlogId , userId } = req.body;

      const NewsAndBlogsDislike = await this.NewsAndBlogsUsecase.NewsAndBlogsDislikeForm( BlogId , userId);
      return res.json({
        success: NewsAndBlogsDislike?.success,
        status: NewsAndBlogsDislike?.status,
        data: NewsAndBlogsDislike?.data,
      });       
    }catch(error){
      console.log(error)
    }
  }

}

export default NewsAndBlogsController;