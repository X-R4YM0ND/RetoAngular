import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { productsService } from '../../api/productsService';


@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent implements OnInit {
  private router = inject(Router);
  private apiserv = inject(productsService);

  searchText: string = '';
  pageSize: number = 5;

  products: Product[] = [];
  proFilter: Product[] = [];

  productoAEliminar: Product | null = null;
  mostrarModal: boolean = false;

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.apiserv.getAll().subscribe((data) => {
      this.products = data;
      this.actualizarFiltrados();
    });
  }

  actualizarFiltrados() {
    this.proFilter = this.products
      .filter(p =>
        (p.nombre?.toLowerCase() ?? '').includes(this.searchText.toLowerCase()) ||
        (p.descripcion?.toLowerCase() ?? '').includes(this.searchText.toLowerCase())
      )
      .slice(0, this.pageSize);
  }

  onSearchTextChange() {
    this.actualizarFiltrados();
  }

  onPageSizeChange() {
    this.actualizarFiltrados();
  }

  crear() {
    this.router.navigate(['/create']);
  }

  confirmEliminate(product: Product) {
    this.productoAEliminar = product;
    this.mostrarModal = true;
  }

  cancelarEliminacion() {
    this.productoAEliminar = null;
    this.mostrarModal = false;
  }

  eliminarConfirmado() {
    if (this.productoAEliminar) {
      this.apiserv.delete(this.productoAEliminar.id).subscribe(() => {
        this.cargarProductos();
        this.cancelarEliminacion();
      });
    }
  }
}
