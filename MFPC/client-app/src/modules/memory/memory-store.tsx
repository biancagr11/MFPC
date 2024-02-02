import { createContext } from "react";
import ApiService from "../../services/apiService.ts";
import { action, makeAutoObservable, observable } from "mobx";
import { ApiEndpoints } from "../../configs/endpoints.ts";
import { Memory } from "../../interfaces/Models.ts";
import { AddMemoryRequest, ToggleFavourite, UpdateMemoryRequest } from "../../interfaces/Requests.ts";

export class MemoryStore {
  @observable public memories: Memory[] = [];
  @observable public favourites: Memory[] = [];
  @observable public selectedMemory: UpdateMemoryRequest;
  @observable public addResponse: number = 1;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  public getMemories = async () => {
    await ApiService.get<any>(ApiEndpoints.getMemories).then((response) => {
      this.memories = response.data.memories;
    }).catch((error) => {console.log(error);});
  };

  @action
  public addMemory = async (request: AddMemoryRequest) => {
    await ApiService.post<number, AddMemoryRequest>(ApiEndpoints.addMemory, request).then((response) => {
      this.addResponse = response.data;
    }).catch((error) => {console.log(error);});
  };

  @action
  public toggleFavourite = async (id: number) => {
    const request: ToggleFavourite = {id: id};
    await ApiService.put<boolean, ToggleFavourite>(ApiEndpoints.favourite, request).then((response) => {
    }).catch((error) => {console.log(error);});
  };

  @action
  public deleteMemory = async (id: number) => {
    await ApiService.delete<boolean>(`${ApiEndpoints.delete}/${id}`).then((response) => {
    }).catch((error) => {console.log(error);});
  };

  @action
  public getFavourites = async () => {
    if(this.memories.length == 0){
      await this.getMemories();
    }

    this.favourites = this.memories.filter(m => m.favourite === true);
  };

  @action
  public updateMemory = async (request: UpdateMemoryRequest) => {
    await ApiService.put<number, AddMemoryRequest>(ApiEndpoints.update, request).then((response) => {
    }).catch((error) => {console.log(error);});
  };

  @action
  public selectMemory = async (id: number) => {
    this.selectedMemory = this.memories.filter(memory => memory.id == id)[0];
  };
}

export const memoryStore: MemoryStore = new MemoryStore();
export const MemoryContext = createContext(memoryStore);
