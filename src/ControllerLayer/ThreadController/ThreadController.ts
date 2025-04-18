import { Request, Response, NextFunction } from "express";
import ThreadUsecase from "../../UsecaseLayer/ThreadUsecase/ThreadUsecase";

class ThreadController {
  private ThreadUsecase: ThreadUsecase;

  constructor(ThreadUsecase: ThreadUsecase) {
    this.ThreadUsecase = ThreadUsecase;
  }


  async AddThread(req: Request, res: Response, next: NextFunction){
        try{
        
        const { title , content , authorId , tags  } = req.body;

        const addThread = await this.ThreadUsecase.AddThreadForm(title , content , authorId , tags)

           return res.json({
          success: addThread?.success,
          status: addThread?.status,
          data: addThread?.data,
        });

        }catch(error){
          console.log(error)
        }
  }

  async AddComment(req: Request, res: Response, next: NextFunction){
    try{

      const { userId ,  threadId , authorId , content } = req.body;

      const addComment =await this.ThreadUsecase.AddCommentForm(userId , threadId , authorId , content )
      return res.json({
        success: addComment?.success,
        status: addComment?.status,
        data: addComment?.data,
      });      
    }catch(error){
      console.log(error)
    }
 }

 async EditComment(req: Request, res: Response, next: NextFunction){
  try{
    
    const { _id ,  threadId , authorId , content } = req.body;

    const editComment =await this.ThreadUsecase.EditCommentForm( _id ,  threadId , authorId , content)

    return res.json({
      success: editComment?.success,
      status: editComment?.status,
      data: editComment?.data,
    });
  }catch(error){
    console.log(error)
  }
}

async EditThread(req: Request, res: Response, next: NextFunction){
  try{

    const { _id , title , content , authorId , tags } = req.body;

    const editThread = await this.ThreadUsecase.EditThreadForm(_id , title , content , authorId , tags)

    return res.json({
      success: editThread?.success,
      status: editThread?.status,
      data: editThread?.data,
    });
  }catch(error){
    console.log(error)
  }
}

async DeleteThread(req: Request, res: Response, next: NextFunction){
  try{

    const { threadId  } = req.body;

    const deleteThread = await this.ThreadUsecase.DeleteThreadForm(threadId )

    return res.json({
      success: deleteThread?.success,
      status: deleteThread?.status,
      data: deleteThread?.data,
    });
  }catch(error){
    console.log(error)
  }
}

async DeleteComment(req: Request, res: Response, next: NextFunction){
  try{

    const { commentId } = req.body;

    const deleteComment = await this.ThreadUsecase.DeleteCommentForm( commentId )
    return res.json({
      success: deleteComment?.success,
      status: deleteComment?.status,
      data: deleteComment?.data,
    });
  }catch(error){
    console.log(error)
  }
}

async CommentLikes(req: Request, res: Response, next: NextFunction){
  try{

    const { commentId ,  userId } = req.body;

    const likeComment =await this.ThreadUsecase.CommentLikesForm( commentId , userId )

    return res.json({
      success: likeComment?.success,
      status: likeComment?.status,
      data: likeComment?.data,
    });
  }catch(error){
    console.log(error)
  }
}

async ThreadUpvote(req: Request, res: Response, next: NextFunction){
  try{

    const { threadId , likes } = req.body;

    const likeThread = await this.ThreadUsecase.ThreadUpvoteForm(threadId , likes )

    return res.json({
      success: likeThread?.success,
      status: likeThread?.status,
      data: likeThread?.data,
    });
  }catch(error){
    console.log(error)
  }
}

async CommentDislikes(req: Request, res: Response, next: NextFunction){
  try{

    const { commentId ,  userId } = req.body;

    const dislikeComment =await this.ThreadUsecase.CommentDislikesForm( commentId , userId )

    return res.json({
      success: dislikeComment?.success,
      status: dislikeComment?.status,
      data: dislikeComment?.data,
    });
  }catch(error){
    console.log(error)
  }
}

async ThreadDownvote(req: Request, res: Response, next: NextFunction){
  try{

    const { threadId , userId } = req.body;

    const dislikeThread = await this.ThreadUsecase.ThreadDownvoteForm(threadId , userId )

    return res.json({
      success: dislikeThread?.success,
      status: dislikeThread?.status,
      data: dislikeThread?.data,
    });
  }catch(error){
    console.log(error)
  }
}

async ThreadShares(req: Request, res: Response, next: NextFunction){
  try{

    const { threadId , shares } = req.body;

    const shareThread = await this.ThreadUsecase.ThreadSharesForm(threadId , shares )

    return res.json({
      success: shareThread?.success,
      status: shareThread?.status,
      data: shareThread?.data,
    });
  }catch(error){
    console.log(error)
  }
}

async ThreadSearch(req: Request, res: Response, next: NextFunction){
  try{

    const { searchInp } = req.body;
     //--------about topic ----
    const shareThread = await this.ThreadUsecase.ThreadSearchForm(searchInp )

    return res.json({
      success: shareThread?.success,
      status: shareThread?.status,
      data: shareThread?.data,
    });
  }catch(error){
    console.log(error)
  }
}

async ThreadFilter(req: Request, res: Response, next: NextFunction){
  try{

    const {  filter } = req.body;

    const shareThread = await this.ThreadUsecase.ThreadFilterForm(  filter )

    return res.json({
      success: shareThread?.success,
      status: shareThread?.status,
      data: shareThread?.data,
    });

  }catch(error){
    console.log(error)
  }
}

}


export default ThreadController;