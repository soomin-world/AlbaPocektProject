export type IPayload = {
  roomId: string | undefined;
  sender: string | null;
  message: string;
  type: string;
  createdAt: string;
};

export type IMychat = {
  message: string;
  sender?: string;
};
