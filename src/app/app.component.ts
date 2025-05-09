import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
/*import { ProductTableComponent } from './components/product-table/product-table.component';*/

@Component({
  selector: 'app-root',
  imports: [HeaderComponent,  RouterOutlet],
  templateUrl: './app.component.html',
  template: '<router-outlet></router-outlet>',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularPractice';
}
