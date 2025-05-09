import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormsModule, ValidationErrors } from '@angular/forms';
import { Router,} from '@angular/router';
import { Product } from '../../models/product.model';
import { productsService } from '../../api/productsService';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  product: Product = {
    id: '',
    nombre: '',
    descripcion: '',
    logo: '',
    fechaLiberacion: new Date(),
    fechaRevision: new Date()
  };

  showErrors = false;
  

  constructor(private apiService: productsService, private router: Router) {}

  enviarFormulario() {
    if (
      !this.product.id ||
      !this.product.nombre ||
      !this.product.descripcion ||
      !this.product.logo ||
      !this.product.fechaLiberacion ||
      !this.product.fechaRevision
    ) {
      this.showErrors = true;
      return;
    }

    this.apiService.create(this.product).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  // <Boton Inicio
   inicio(){
    this.router.navigate(['/'])
   }

   validacionform(){
    const VldId = this.product.id.length >=3 && this.product.id.length <=10;
    const VldNm = this.product.nombre.length >=5 && this.product.nombre.length <=100;
    const VldDs = this.product.descripcion.length <=200;
  
   }

   onlylettersV(control : AbstractControl):ValidationErrors | null{
    if(!control.value){
      return null;
    }

    const regexOnlyLetter = /^[a-zA-ZáéíóúÁÉÍÓÚÑñ]+$/;
    const valid = regexOnlyLetter.test(control.value);
    return valid ? null : { onlyletters:true};

   }



}
