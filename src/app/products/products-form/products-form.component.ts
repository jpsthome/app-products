import { Product } from './../models/product.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent implements OnInit {
  productForm!: FormGroup;
  product: Product = {} as Product;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm(this.product);
  }

  createForm(product: Product) {
    this.productForm = this.formBuilder.group({
      productCode: [product.productCode, Validators.required],
      name: [product.name, Validators.required],
      fabrication: [product.fabrication, Validators.required],
      size: [product.size, Validators.required],
      value: [product.value, Validators.required],
    });
  }

  onSubmit() {
    this.createProduct();
  }

  createProduct() {
    console.log(this.productForm.value);
    this.productsService.create(this.productForm.value).subscribe(
      (res) => {
        this.presentToast('Produto salvo com sucesso');
        this.router.navigate(['/tabs/products']);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }
}
