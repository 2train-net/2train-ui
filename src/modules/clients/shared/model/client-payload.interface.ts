export interface IClientPayload {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  avatar?: string | null;
}
