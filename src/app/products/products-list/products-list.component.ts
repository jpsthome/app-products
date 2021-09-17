import { Router } from '@angular/router';
import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  products?: Product[];
  expandedId: string = null;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getAll().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  expand(id: string) {
    if (id !== this.expandedId) {
      this.expandedId = id;
    } else {
      this.expandedId = null;
    }
    console.log(id);
  }

  editProduct(id: string) {
    this.router.navigate(['/tabs/products', id]);
  }

  deleteProduct(id: string) {
    this.productsService.delete(id).subscribe(
      (res) => {
        this.products = this.products?.filter((product) => product.id !== id);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      header: 'Confirmar!',
      message: 'Deseja realmente <strong>deletar</strong> este produto?!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteProduct(id);
          },
        },
      ],
    });

    await alert.present();
  }
}
