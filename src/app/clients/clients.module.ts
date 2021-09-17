import { ClientsListComponent } from './clients-list/clients-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientsPageRoutingModule } from './clients-routing.module';

import { ClientsPage } from './clients.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ClientsPageRoutingModule],
  declarations: [ClientsPage, ClientsListComponent],
})
export class ClientsPageModule {}
