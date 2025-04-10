import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { FormComponent } from './form.component';

@Component({
  selector: 'app-product',
  imports: [FormComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  productSelected: Product = new Product();

  constructor(private service: ProductService) {}

  // Solo se ejecuta una vez.
  ngOnInit(): void {
    this.service.findAll().subscribe((products) => (this.products = products));
  }

  // Recogemos el evento emitido por el componente hijo.
  addProduct(product: Product): void {
    if (product.id > 0) {
      // Update.
      this.service.update(product).subscribe((productUpdated) => {
        this.products = this.products.map((prod) => {
          if (prod.id === product.id) {
            return { ...productUpdated };
          }
          return prod;
        });
      });
    } else {
      // Create.
      this.service
        .create(product)
        .subscribe((productNew) => this.products.push({ ...productNew }));
    }

    // Reset formulario.
    this.productSelected = new Product();
  }

  // Se usa para transferir una información entre componentes.
  onUpdateProduct(productRow: Product): void {
    // Importante pasarle una clonación para evitar la inmutabilidad.
    this.productSelected = { ...productRow };
  }

  // Se usa para eliminar un producto.
  onRemoveProduct(id: number): void {
    this.service.remove(id).subscribe(() => {
      this.products = this.products.filter((product) => product.id !== id);
    });
  }
}
