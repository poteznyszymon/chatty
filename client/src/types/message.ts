export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  sentAt: string;
  confirmed: boolean;
  sending?: boolean;
}
