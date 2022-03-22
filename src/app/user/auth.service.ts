import { Injectable } from '@angular/core';
import { IUser } from './user.model';

@Injectable()
export class AuthService {
  currentUser: IUser;
  login(userName: string, password: string) {
    this.currentUser = {
      id: 1,
      firstName: 'Denizhan',
      lastName: 'Aksakal',
      userName: 'denizhanaksakal',
    };
  }
  isAuthenticated() {
    return !!this.currentUser;
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
  }
}
