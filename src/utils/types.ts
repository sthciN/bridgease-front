export interface User {
    email: string;
    firstName: string | null;
    lastName: string | null;
    age: number | null;
    role: 'user' | 'admin';
    // Add other user properties as needed
}

export enum ActionType {
    Payment = 'payment',
    AttendInterview = 'attendInterview',
    Scheduling = 'scheduling',
    SubmitDocument = 'submitDocument',
    ReceiveDocument = 'receiveDocument',
    Check = 'check',
    // Add more action types as needed
  }
