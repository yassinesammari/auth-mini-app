import { Component } from '@angular/core';

@Component({
  selector: 'one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <div class="body">
      <header>
        <app-header></app-header>
      </header>
      <main>
        <ng-content ></ng-content>
      </main>
      <footer>
        <app-footer></app-footer>
      </footer>
    </div>
  `,
})
export class OneColumnLayoutComponent {}
