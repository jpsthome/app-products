import { Client } from './../models/client.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ClientsService } from '../services/clients.service';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.scss'],
})
export class ClientsFormComponent implements OnInit {
  clientForm!: FormGroup;
  client: Client = {} as Client;
  clientId: string | null = null;
  isEdit = false;

  constructor(
    private formBuilder: FormBuilder,
    private clientsService: ClientsService,
    private toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id');

    console.log(this.clientId);
    this.createForm(this.client);
    if (this.clientId != null) {
      this.isEdit = true;
      this.clientsService.get(this.clientId).subscribe((client) => {
        this.client = client;
        this.createForm(this.client);
      });
    }
  }

  createForm(client: Client) {
    this.clientForm = this.formBuilder.group({
      clientCode: [client.clientCode, Validators.required],
      name: [client.name, Validators.required],
      sex: [client.sex, Validators.required],
      cpf: [client.cpf, Validators.required],
      email: [client.email, Validators.required],
    });
  }

  onSubmit() {
    if (this.isEdit) {
      this.editClient();
    } else {
      this.createClient();
    }
  }

  cancel() {
    this.router.navigate(['/tabs/clients']);
  }

  createClient() {
    console.log(this.clientForm.value);
    this.clientsService.create(this.clientForm.value).subscribe(
      () => {
        this.presentToast('Cliente cadastrado com sucesso');
        this.router.navigateByUrl('/tabs/clients');
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  editClient() {
    this.clientsService.update(this.clientId, this.clientForm.value).subscribe(
      () => {
        this.presentToast('Cliente editado com sucesso');
        this.router.navigate(['/tabs/clients']);
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
