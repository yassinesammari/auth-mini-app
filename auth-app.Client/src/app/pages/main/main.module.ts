import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MainRoutingModule } from './main-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { MainComponent } from './main.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatCommonModule } from '@angular/material/core';

@NgModule({
  imports: [
    RouterOutlet,
    MainRoutingModule,
    ThemeModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatTableModule,
    MatCommonModule,
  ],
  exports: [
    MainComponent
  ],
  declarations: [
    MainComponent,
    HomeComponent
  ],
  providers: [
  ],
})
export class MainModule {}
