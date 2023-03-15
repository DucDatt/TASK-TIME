import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, pipe } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/Services/user.service';
import { UserActions } from 'src/redux/actions/user.action';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) { }

  $getById = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.get),
      switchMap((action) =>
        this.userService.getUserByUid(action.uid).pipe(
          map((user: User) => {
            if (user._id) {
              console.log(user._id);
              return UserActions.getSuccess({ user: user });
            } else {
              return UserActions.getFail({ error: 'User not found' });
            }
          }),
          catchError((error) => of(UserActions.getFail({ error: error })))
        )
      )
    )
  );

  $createUser = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.create),
      switchMap((action) =>
        this.userService.createUser(action.user).pipe(
          map((user: User) => {
            if (user._id) {
              console.log(user._id)
              return UserActions.createSuccess({ user: user });
            } else {
              console.log('User is existed');
              return UserActions.createFail({ error: 'Create false' });
            }
          }),
          catchError((error) => of(UserActions.createFail({ error: error })))
        )
      )
    )
  );
}
