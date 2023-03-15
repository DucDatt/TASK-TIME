import { Injectable } from '@angular/core';
import {
  Auth,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  onAuthStateChanged,
  UserCredential,
} from '@angular/fire/auth';
import { signInWithPopup } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { UserActions } from 'src/redux/actions/user.action';
import { UserState } from 'src/redux/states/user.state';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user!: User | null;
  user$ = new Subject<User | null>();
  public _token = localStorage.getItem('_token');
  constructor(public auth: Auth, private store: Store<{ user: UserState }>) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.user = {
          uid: user?.uid,
          displayName: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
          _id: '',
          createdAt: 0,
          updatedAt: 0,
        };
        // console.log(this.user);
        this.store.dispatch(UserActions.get({ uid: user.uid }));
        this.user$.next(this.user);
      }
    });
  }

  async LoginWithGoogle() {
    console.log('loginn......');
    let provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  logOut() {
    console.log('lougout......');
    this.auth.signOut().then(() => {
      window.location.href = '/login';
    });
  }
}
