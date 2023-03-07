import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, User, onAuthStateChanged, UserCredential } from '@angular/fire/auth';
import { signInWithPopup } from '@angular/fire/auth';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!: User | null;
  user$ = new Subject<User|null>();
  public _token = localStorage.getItem('_token')
  constructor(public auth: Auth) {
    onAuthStateChanged(this.auth, (user) => {
      this.user = user;
      this.user$.next(user);
      // if(user) {
      //   user.getIdToken().then((token) => {console.log(token)})
      // }
    })
  }

  async LoginWithGoogle(){
    let provider = new GoogleAuthProvider()
    signInWithPopup(this.auth, provider).then((result) => {

    }
    ).catch((error) => {
      console.log(error)
    })
  }

  logOut(){
    this.auth.signOut().then(()=>{
      window.location.reload();
    })
  }
}
