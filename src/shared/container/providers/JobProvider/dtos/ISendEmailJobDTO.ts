import User from "@modules/users/infra/typeorm/entities/User";

export default interface ISendEmailJobDTO {
  to_users: User[];
  subject: string;
  file: string;
  variables: {
    [key: string]: string | string[] | number | Object;
  }
}