interface IUser {
    _id?: string;
    fullName: string;
    email?: string;
    phoneNumber?: string;
    photo: string; 
    bio: string;
    countryOfPractice: string;
    medicalQualification: string;
    yearOfGraduation: number;
    hasFormalTrainingInPalliativeCare: boolean;
    medicalRegistrationAuthority: string;
    medicalRegistrationNumber: string;
    affiliatedPalliativeAssociations: string;
    specialInterestsInPalliativeCare: string;
    role?: string ;
    password: string; 
    registrationStatus?: 'pending' | 'approved' | 'rejected';
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export default IUser;
  