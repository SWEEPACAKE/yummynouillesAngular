import { Component, signal } from '@angular/core';

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
import * as jsonData from './assets/data.json';

@Component({
  selector: 'app-root',
  imports: [Menu, Header, NosAdresses, BandeauRouge, SavoirFaire, ReseauxSociaux, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('yummynouilles');

  dataMenu: any = jsonData.liensMenu;
  dataAdresses: any = jsonData.adresses;
  articleSavoirFaire: any = jsonData.articleSavoirFaire;
  postsReseauxSociaux: any = jsonData.postsReseauxSociaux;
  articleContact: any = jsonData.articleContact;

}
