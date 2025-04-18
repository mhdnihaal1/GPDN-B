import IBlog from "../../../DomainLayer/BlogDomain.";
import NewsAndBlogsRepo from "../../../UsecaseLayer/Interface/NewsAndBlogsRepo";
import BlogSchema from "../../database/BlogSchema";


class NewsAndBlogsRepository implements NewsAndBlogsRepo {

    
    async fetchNewsAndBlogs(): Promise<IBlog | any> {
        try {
          const NewsAndBlogs = await BlogSchema.find();
          return NewsAndBlogs;
        } catch (error) {
          console.log(error);
          return error;
        }
      }

      async fetchBlogsById(_id:string): Promise<IBlog | any> {
        try {
          const fetchBlogs = await BlogSchema.findById(_id);
          return fetchBlogs;
        } catch (error) {
          console.log(error);
          return error;
        }
      }

      
      async addNewsAndBlogs(NewsAndBlogs:IBlog): Promise<IBlog | any> {
        try {
          const newNewsAndBlogs = new BlogSchema(NewsAndBlogs); 
          const savedNewsAndBlogs = await newNewsAndBlogs.save();   
         return savedNewsAndBlogs;
         
        } catch (error) {
          console.log(error);
          return error;
        }
      }
      

      async editNewsAndBlogs(NewsAndBlogs:IBlog): Promise<IBlog | any> {
        try {
          const editNewsAndBlogs = await BlogSchema.findByIdAndUpdate(
            NewsAndBlogs._id,
            { $set: NewsAndBlogs },
            { new: true }
          );
          
         return editNewsAndBlogs;
        } catch (error) {
          console.log(error);
          return error;
        }
      }
      

      async deleteNewsAndBlogs(BlogId:string): Promise<IBlog | any> {
        try {
          const savedNewsAndBlogs = await BlogSchema.findOneAndDelete({_id:BlogId});
          return savedNewsAndBlogs;
        } catch (error) {
          console.log(error);
          return error;
        }
      }

      

      async searchNewsAndBlogs(searchInp:string): Promise<IBlog | any> {
        try {
          const searchNewsAndBlogs = await BlogSchema.find ({
            $or: [
              { title: { $regex: searchInp, $options: "i" } },
              { content: { $regex: searchInp, $options: "i" } },
              { tags: { $regex: searchInp, $options: "i" } },
              { category: { $regex: searchInp, $options: "i" } },
            ]
          });
          return searchNewsAndBlogs;
        } catch (error) {
          console.log(error);
          return error;
        }
      }

      
      async filterNewsAndBlogs(topic:string): Promise<IBlog | any> {
        try {
          let filterNewsAndBlogs;
          if(topic == 'All'){
             filterNewsAndBlogs = await BlogSchema.find();
          }else{
             filterNewsAndBlogs = await BlogSchema.find({
              category: { $regex: new RegExp(`^${topic}$`, 'i') }
            });
          }
          return filterNewsAndBlogs;

        } catch (error) {
          console.log(error);
          return error;
        }
      }

      async findNewsAndBlogsById(BlogId:string ): Promise<IBlog | any> {
        try {
          const NewsAndBlogs = await BlogSchema.findOne({ _id : BlogId });
          return NewsAndBlogs;
        } catch (error) {
          console.log(error);
          return error;
        }
      }

}


export default NewsAndBlogsRepository;
