import { Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';
import { Head } from 'rxjs';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ProductTableComponent } from './components/product-table/product-table.component';

export const routes: Routes = [
    {
        path: '', component: ProductTableComponent 
    },
    {
        path: 'create', component: CreateUserComponent
    },
];


