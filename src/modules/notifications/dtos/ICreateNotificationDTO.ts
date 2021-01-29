import Room from "@modules/notifications/infra/typeorm/schemas/Room";

export default interface ICreateNotificationDTO {
  content: string;
  sale_id: string;
  room: Room[];
}