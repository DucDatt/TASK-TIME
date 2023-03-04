import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, User, onAuthStateChanged } from '@angular/fire/auth';
import { signInWithPopup } from '@angular/fire/auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user!: User | null; // dùng để đảm bảo user không bằng NULL
  user$ = new Subject<User | null>

  constructor(public auth: Auth) {
    onAuthStateChanged(this.auth, (user)=>{
      if(user)
      {
        this.user = user
        this.user$.next(this.user)
      }
      else
      {
        this.user = null
        this.user$.next(this.user)
      }
    })
  }
  async LoginWithGoogle(){
    let provider = new GoogleAuthProvider()
    return await signInWithPopup(this.auth, provider)
  }

  logOut(){
    this.auth.signOut().then(()=>{
      window.location.reload();
    })
  }
}
