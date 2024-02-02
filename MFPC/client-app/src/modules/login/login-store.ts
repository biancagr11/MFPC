import { createContext } from 'react';
import ApiService from '../../services/apiService.ts';
import { action, makeAutoObservable, observable } from 'mobx';
import { LoginRequest } from '../../interfaces/Requests';
import { LoginResponse } from '../../interfaces/Models';
import { ApiEndpoints } from '../../configs/endpoints.ts';

export class LoginStore {
    @observable public id: number;
    @observable public firstName: string;
    @observable public lastName: string;
    @observable public authenticated: number;
    @observable public page: number;

    constructor(){
      makeAutoObservable(this);
      this.authenticated = -1;
    }

    @action
    public login = async (credentials: LoginRequest) => {
        await ApiService.post<LoginResponse, LoginRequest>(ApiEndpoints.loginUser, credentials)
      .then(({ data: { id, firstName, lastName, result } }) => {
        this.authenticated = -1;
        if(result == 0){
          this.id = id;
          this.firstName = firstName;
          this.lastName = lastName;
          this.authenticated = 1;
        }else{
          this.authenticated = 0;
        }
      });
    }

    @action
    public clickPage = async (value) => {
      this.page = value;
    }
}

export const loginStore: LoginStore = new LoginStore();
export const LoginContext = createContext(loginStore);