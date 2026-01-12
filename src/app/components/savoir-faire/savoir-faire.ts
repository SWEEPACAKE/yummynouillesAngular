import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-savoir-faire',
  imports: [],
  templateUrl: './savoir-faire.html',
  styleUrl: './savoir-faire.scss',
})
export class SavoirFaire {
  @Input() monArticle: any = {};
}
