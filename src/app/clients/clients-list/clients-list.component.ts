import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Client } from '../models/client.model';
import { ClientsService } from '../services/clients.service';

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
}
