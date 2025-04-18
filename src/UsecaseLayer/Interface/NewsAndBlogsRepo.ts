import IBlog from "../../DomainLayer/BlogDomain.";

interface NewsAndBlogsRepo {
  fetchNewsAndBlogs(): Promise<IBlog | any>;
  addNewsAndBlogs(NewsAndBlogs: IBlog): Promise<IBlog | any>;
  editNewsAndBlogs(NewsAndBlogs: IBlog): Promise<IBlog | any>;
  deleteNewsAndBlogs(BlogId: string): Promise<IBlog | any>;
  searchNewsAndBlogs(searchInp: string): Promise<IBlog | any>;
  findNewsAndBlogsById(BlogId: string): Promise<IBlog | any>;
}

export default NewsAndBlogsRepo;
