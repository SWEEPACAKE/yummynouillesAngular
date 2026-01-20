import { ChangeDetectorRef, Component, signal } from '@angular/core';

// Import des composants custom
import { Menu } from "./components/menu/menu";
import { Header } from "./components/header/header";
import { NosAdresses } from "./components/nos-adresses/nos-adresses";
import { BandeauRouge } from "./components/bandeau-rouge/bandeau-rouge";
import { SavoirFaire } from "./components/savoir-faire/savoir-faire";
import { ReseauxSociaux } from "./components/reseaux-sociaux/reseaux-sociaux";
import { Contact } from "./components/contact/contact";
import { Footer } from "./components/footer/footer";

// Import des données
// import * as jsonData from './assets/data.json';

import { ApiService } from './api-service';

@Component({
  selector: 'app-root',
  imports: [Menu, Header, NosAdresses, BandeauRouge, SavoirFaire, ReseauxSociaux, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('yummynouilles');

  dataMenu: any[] = [];
  dataAdresses: any[] = [];
  articleSavoirFaire: any[] = [];
  postsReseauxSociaux: any[] = [];
  articleContact: any[] = [];

  constructor(private monApiService: ApiService, private cdr: ChangeDetectorRef) {
    this.monApiService.getJsonData().subscribe({
      next: (response) => {
        let returnedArray = JSON.parse(response);
        this.dataMenu = returnedArray.liensMenu;
        this.dataAdresses = returnedArray.adresses;
        this.articleSavoirFaire = returnedArray.articles[0];
        this.postsReseauxSociaux = returnedArray.postsReseauxSociaux;
        this.articleContact = returnedArray.articles[1];

        this.cdr.detectChanges();
      },
      error: (err) => {
        switch(err.status) {
          case 401:
            console.log('Erreur 401 : Token manquant');
            break;
          case 403:
            console.log('Erreur 403 : Accès interdit');
            break;
        }
      }
    });
  }

}
