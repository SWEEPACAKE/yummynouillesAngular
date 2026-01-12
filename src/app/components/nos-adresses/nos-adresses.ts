import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-nos-adresses',
  imports: [],
  templateUrl: './nos-adresses.html',
  styleUrl: './nos-adresses.scss',
})
export class NosAdresses {

  @Input() mesAdresses: any = [];

}
