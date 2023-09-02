import {inject, Injectable} from '@angular/core';
import {Auth, signInWithEmailAndPassword} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth)

  signIn({email, password}: any) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(({user}) => {
        user && localStorage.setItem('user', user.uid);
      });
  }

  currentUser() {
    return this.auth.currentUser
  }

}
