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


import { MaterialModule } from 'src/shared/material.module';
import { MemberPopupComponent } from './components/member-popup/member-popup.component';
import { ColPopupComponent } from './components/col-popup/col-popup.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { UpdateProjectPopupComponent } from './components/update-project-popup/update-project-popup.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    MemberPopupComponent,
    ColPopupComponent,
    UpdateProjectPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
