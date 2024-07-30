


// user name interface
export type UserName = {
    firstName: string;
    middleName?: string;
    lastName: string;
};

// guardian interface
export type Guardian = {
    name: UserName;
    contactNumber: string;
    relation: string;
};

// local guardian interface
export type LocalGuardian = {
name:string;
occupation:string;
contactNumber:string;
address:string;
};

// student interface
export type Student = {
  id: string;
  name: UserName;
  gender: "male" | "female";
  dateOfBirth: string;
  email: string;
  contactNumber: string;
  emergencyContact: string;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImg: string;
  isActive: "active" | "inactive";
};
