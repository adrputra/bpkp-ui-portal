/* eslint-disable @typescript-eslint/no-unused-vars */
interface User {
    username: string;
    email: string;
    fullname: string;
    shortname: string;
    role_id: string;
    institution_id: string;
    created_at: string;
  }
  
  interface RequestNewUser extends Omit<User, 'created_at'> {
    password: string;
    confirmPassword: string;
  }
  