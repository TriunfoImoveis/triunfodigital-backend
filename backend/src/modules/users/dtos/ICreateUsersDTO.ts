export default interface ICreateUsersDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
  admission_date: Date;
  goal: number;
  departament_id: string;
  office_id: string;
}
