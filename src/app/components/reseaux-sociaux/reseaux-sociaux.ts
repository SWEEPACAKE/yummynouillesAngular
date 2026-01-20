import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reseaux-sociaux',
  imports: [],
  templateUrl: './reseaux-sociaux.html',
  styleUrl: './reseaux-sociaux.scss',
})
export class ReseauxSociaux {
  @Input() images: any[] = [];
}
