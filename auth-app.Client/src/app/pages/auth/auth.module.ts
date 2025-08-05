import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ThemeModule } from '../../@theme/theme.module';
import { AuthRoutingModule } from './auth-routing.module';

const MODULES = [
    AuthRoutingModule,
    RouterOutlet,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule
  ];
  const COMPONENTS = [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ];

@NgModule({
  imports: [...MODULES],
  exports: [],
  declarations: [...COMPONENTS],
  providers: [],
})
export class AuthModule {
  
}
