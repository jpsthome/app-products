import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'products',
        loadChildren: () =>
          import('./../products/products.module').then(
            (m) => m.ProductsPageModule
          ),
      },
      {
        path: 'clients',
        loadChildren: () =>
          import('./../clients/clients.module').then(
            (m) => m.ClientsPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/products',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/products',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
