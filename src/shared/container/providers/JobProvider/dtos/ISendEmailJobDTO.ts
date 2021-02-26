export default interface ISendEmailJobDTO {
  to_users: string;
  subject: string;
  file: string;
  variables: {
    [key: string]: string | string[] | number;
  }
}