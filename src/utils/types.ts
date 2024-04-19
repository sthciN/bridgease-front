export interface User {
    email: string;
    firstName: string;
    lastName: string;
    age: number;
    avatar: string;
    role: 'user' | 'admin';
    // Add other user properties as needed
}

export enum ActionType {
    Payment = 'payment',
    AttendInterview = 'attendInterview',
    Scheduling = 'scheduling',
    SubmitDocument = 'submitDocument',
    ReceiveDocument = 'receiveDocument',
    // Add more action types as needed
  }
