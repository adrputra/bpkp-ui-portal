/* eslint-disable @typescript-eslint/no-unused-vars */
interface RequestAttendance {
  username: string;
  institution_id: string;
  remarks: string;
}

interface UserAttendance {
  id: string;
  username: string;
  fullname: string;
  shortname: string;
  gender: string;
  email: string;
  phone_number: string;
  check_in: string;
  check_out: string;
  status_in: string;
  status_out: string;
  remark_in: string;
  remark_out: string;
  source_in: string;
  source_out: string;
}