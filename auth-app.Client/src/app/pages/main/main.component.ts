import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
    <one-column-layout>
      <router-outlet />
    </one-column-layout>
  `,
})
export class MainComponent {}
