/* eslint-disable @typescript-eslint/no-unused-vars */
interface User {
    username: string;
    email: string;
    fullname: string;
    shortname: string;
    role_id: string;
    role_name: string;
    institution_id: string;
    institution_name: string;
    created_at: string;
    address: string;
    phone_number: string;
    gender: string;
    religion: string;
  }
  
  interface RequestNewUser extends Omit<User, 'role_name' | 'institution_name' | 'created_at'> {
    password: string;
    confirmPassword: string;
  }

  interface RequestEditUser extends Omit<User, 'role_name' | 'institution_name' | 'created_at'> {}
  