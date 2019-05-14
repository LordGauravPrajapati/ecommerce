import { SettingsComponent } from './settings/settings.component';

import {HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AboutusComponent } from './shared/aboutus/aboutus.component';
import { CustommaterialModule } from './custommaterial.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SetproductComponent} from './admin/setproduct/setproduct.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {AdmintabComponent} from './admin/admintab/admintab.component';
import {AdminordersComponent} from './admin/adminorders/adminorders.component';
import {AdmincartsComponent} from './admin/admincarts/admincarts.component';
import {AdminusersComponent} from './admin/adminusers/adminusers.component';
import {OrdersComponent} from './user/orders/orders.component';
import {CartsComponent} from './user/carts/carts.component';
import {UserComponent} from './user/user/user.component';
import {ProductComponent} from './user/product/product.component';
import {LoginComponent} from './user/login/login.component';
//firebase setting
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutusComponent,SettingsComponent,SetproductComponent,
    AdmintabComponent,AdminordersComponent,AdmincartsComponent,
    AdminusersComponent,OrdersComponent,CartsComponent,UserComponent,
    ProductComponent,LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustommaterialModule,
    BrowserAnimationsModule,HttpClientModule,FormsModule,ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'onlinestore'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
