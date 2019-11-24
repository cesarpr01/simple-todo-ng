import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  get<T>(id: string): T {
    const item = localStorage.getItem(id);

    if (!item) {
      return undefined as T;
    }

    const result = JSON.parse(item);
    return result as T;
  }

  set<T>(id: string, value: T) {
    localStorage.setItem(id, JSON.stringify(value));
  }
}
