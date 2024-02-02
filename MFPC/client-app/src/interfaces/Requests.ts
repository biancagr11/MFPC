export interface LoginRequest {
  username: string;
  password: string;
}

export interface AddMemoryRequest {
  text: string;
  mood: string;
  date: Date;
}

export interface ToggleFavourite {
  id: number;
}

export interface UpdateMemoryRequest {
  id: number;
  text: string;
  mood: string;
  date: Date;
}