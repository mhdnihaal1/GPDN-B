 interface INotification {
    _id?: string;
    userId: string; 
    message: string;
    isRead: boolean;
    createdAt?: Date;
  }

  
  export default INotification;