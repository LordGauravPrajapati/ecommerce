import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './shared/aboutus/aboutus.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SettingsComponent } from './settings/settings.component';
import { SetproductComponent } from './admin/setproduct/setproduct.component';
import { AdmintabComponent } from './admin/admintab/admintab.component';
import { ProductComponent } from './user/product/product.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuardService} from './services/auth-guard.service';
import { AuthGuardAdminService} from './services/auth-guard-admin.service';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'aboutus',component:AboutusComponent},
  {path:'admin',component:AdmintabComponent , canActivate:[AuthGuardAdminService]},
  {path:'product',component:ProductComponent,canActivate:[AuthGuardService]},
  //{path:'setproduct',component:SetproductComponent},
  {path:'settings',component:SettingsComponent,canActivate:[AuthGuardService]},
  {path:'login',component:LoginComponent},
  {path:'**',redirectTo:'/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
