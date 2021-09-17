import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Client } from '../models/client.model';
import { ClientsService } from '../services/clients.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
})
export class ClientsListComponent implements OnInit {
  clients?: Client[];

  expandedId: string = null;

  constructor(
    private clientsService: ClientsService,
    private router: Router,
    private alertController: AlertController,
    route: ActivatedRoute
  ) {
    route.params.subscribe(() => {
      this.getClients();
    });
  }

  ngOnInit() {}

  expand(id: string) {
    if (id !== this.expandedId) {
      this.expandedId = id;
    } else {
      this.expandedId = null;
    }
    console.log(id);
  }

  editClient(id: string) {
    this.router.navigate(['/tabs/clients', id]);
  }

  getClients() {
    this.clientsService.getAll().subscribe(
      (clients) => {
        this.clients = clients;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteClient(id: string) {
    this.clientsService.delete(id).subscribe(
      (res) => {
        this.clients = this.clients?.filter((client) => client.id !== id);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      header: 'Confirmar!',
      message: 'Deseja realmente <strong>deletar</strong> este cliente?!',
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
            this.deleteClient(id);
          },
        },
      ],
    });

    await alert.present();
  }
}
