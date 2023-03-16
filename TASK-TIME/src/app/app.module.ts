import { TaskEffects } from './../redux/effects/task.effect';
import { TaskReducer } from './../redux/reducers/task.reducer';
import { ProjectEffects } from './../redux/effects/project.effect';
import { ProjectReducer } from './../redux/reducers/project.reducer';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/shared/material.module';
import { MemberPopupComponent } from './components/member-popup/member-popup.component';
import { ColPopupComponent } from './components/col-popup/col-popup.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { EditPopupComponent } from './components/edit-popup/edit-popup.component';
import { UserReducer } from 'src/redux/reducers/user.reducer';
import { UserEffects } from 'src/redux/effects/user.effect';
import {
  provideAnalytics,
  getAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    MemberPopupComponent,
    ColPopupComponent,
    EditPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    StoreModule.forRoot(
      {
        project: ProjectReducer,
        user: UserReducer,
        task: TaskReducer,
      },
      {}
    ),
    EffectsModule.forRoot([ProjectEffects, UserEffects, TaskEffects]),
    SocketIoModule.forRoot(config),
    HttpClientModule,
    provideAnalytics(() => getAnalytics()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
