 interface IAdmin {
    _id?: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: 'superadmin' | 'moderator' | 'editor';
    permissions: string[];
    createdAt?: Date;
    updatedAt?: Date;
  }
export default IAdmin;  