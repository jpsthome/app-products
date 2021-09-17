import { ProductsFormComponent } from './products-form/products-form.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsPageRoutingModule } from './products-routing.module';

import { ProductsPage } from './products.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ProductsPageRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [ProductsPage, ProductsListComponent, ProductsFormComponent],
})
export class ProductsPageModule {}
