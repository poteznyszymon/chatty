export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  image: string | null;
  sentAt: string;
  sending?: boolean;
}
