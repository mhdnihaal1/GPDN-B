import IComment from "../../DomainLayer/CommentsDomain";
import IThread from "../../DomainLayer/ThreadsDomain";


interface ThreadRepo {


    fetchThreads(): Promise<IThread | any> ;
    addThread(thread:IThread):Promise<IThread | any>;
    addComment(comment: IComment): Promise<IComment | any> ;
    editComment(comment: IComment): Promise<IComment | any> ;
    editThread(thread: IThread): Promise<IThread | any> ;
    deleteThread(threadId: string): Promise<IThread | any> ;
    deleteComment(commentId: string): Promise<IComment | any> ;
    findCommentById(commentId: string): Promise<IComment | any> ;
    findThreadById(threadId: string): Promise<IThread | any> ;
    ThreadShare(threadId: string, shares: number): Promise<IThread | any> ;
    searchThread(searchInp: string): Promise<IThread[] | any> ;
    filterlikedThread(): Promise<IThread[] | any> ;
    filtersharedThread(): Promise<IThread[] | any> ;

  
}

export default ThreadRepo;