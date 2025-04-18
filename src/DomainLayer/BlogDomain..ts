 interface IBlog {
    _id?: string;
    title: string;
    content: string;
    description:string;
    tags:string[];
    category:string;
    imageURL:string;
    authorId?: string; 
    approvalStatus?: boolean;
    likes?: number;
    dislikes?:number;
    createdAt?: Date;
    updatedAt?: Date;
  }

  export default IBlog;