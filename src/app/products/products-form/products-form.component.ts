import { Product } from './../models/product.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  productId: string | null = null;
  isEdit = false;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');

    this.createForm(this.product);
    if (this.productId) {
      this.isEdit = true;
      this.productsService.get(this.productId).subscribe((product) => {
        this.product = product;
        this.createForm(this.product);
      });
    }
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
    if (this.isEdit) {
      this.editProduct();
    } else {
      this.createProduct();
    }
  }

  cancel() {
    this.router.navigate(['/tabs/products']);
  }

  createProduct() {
    console.log(this.productForm.value);
    this.productsService.create(this.productForm.value).subscribe(
      () => {
        this.presentToast('Produto cadastrado com sucesso');
        this.router.navigate(['/tabs/products']);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  editProduct() {
    this.productsService
      .update(this.productId, this.productForm.value)
      .subscribe(
        () => {
          this.presentToast('Produto editado com sucesso');
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
