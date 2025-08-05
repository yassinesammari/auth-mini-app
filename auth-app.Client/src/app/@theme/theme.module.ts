import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { OneColumnLayoutComponent } from './layouts/one-column/one-column.layout';

const MODULES = [
  RouterModule, 
  CommonModule,
  MatDividerModule,
  MatIconModule
];
const COMPONENTS = [
  FooterComponent,
  HeaderComponent,
  OneColumnLayoutComponent,
  AlertComponent,
];

@NgModule({
  imports: [...MODULES],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class ThemeModule {
}