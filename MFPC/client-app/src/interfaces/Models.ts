export interface LoginResponse {
    id: number;
    firstName: string;
    lastName: string;
    result: number;
}

export interface Memory {
  id: number;
  text: string;
  mood: string;
  date: Date;
  favourite?: boolean;
}