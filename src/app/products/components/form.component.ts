import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models/product';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'product-form',
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  // Obtenemos la información del producto seleccionado del padre.
  @Input() product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
  };

  // Se usa para transferir una información entre componentes.
  @Output() newProductEvent = new EventEmitter();

  onSubmit(productForm: NgForm): void {
    if (productForm.valid) {
      this.newProductEvent.emit(this.product); // Emitimos al padre del componente.
    }
    productForm.reset();
    productForm.resetForm();
  }
}
