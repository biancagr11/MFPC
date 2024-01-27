import { createContext } from 'react';
import ApiService from '../../services/apiService.ts';
import { action, makeAutoObservable, observable } from 'mobx';
import { LoginRequest } from '../../interfaces/Requests';
import { User } from '../../interfaces/Models';
import { ApiEndpoints } from '../../configs/endpoints.ts';

export class LoginStore {
    @observable public id: number;
    @observable public firstName: string;
    @observable public lastName: string;

    constructor(){
      makeAutoObservable(this);
    }

    @action
    public login = async (credentials: LoginRequest) => {
        await ApiService.post<User, LoginRequest>(ApiEndpoints.loginUser, credentials)
      .then(({ data: { id, firstName, lastName } }) => {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
      });
    }
}

export const loginStore: LoginStore = new LoginStore();
export const LoginContext = createContext(loginStore);