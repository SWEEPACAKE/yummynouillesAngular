import { ChangeDetectorRef, Component, Input } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ApiService } from '../../api-service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  @Input() mesAdresses: any[] = [];
  @Input() monArticle: any = {};
  numero_reservation: number = 0;

  formulaire: FormGroup;
  constructor(private fb: FormBuilder, private monApiService: ApiService, private cdr: ChangeDetectorRef) {
    this.formulaire = this.fb.group({
      id_adresse: ['', [Validators.required]],
      nb_personnes: ['', [Validators.required, Validators.min(1), Validators.max(15)]],
      date_resa: ['', [Validators.required]],
      heure_resa: ['', [Validators.required]],
      message: ['']
    });
  }

  envoyerFormulaire() {
    // Je convertis les données du formulaire en un objet FormData 
    // qui deviendra $_POST
    const formValues = new FormData();
    for(let key in this.formulaire.value) {
      formValues.append(key, this.formulaire.value[key]);
    }
    this.monApiService.postFormData(formValues).subscribe({
      next: (response) => {
        document.getElementById("monFormulaire")?.remove();
        let resultat = JSON.parse(response);
        if(resultat.success) {
          this.numero_reservation = resultat.numero_reservation;
          document.getElementById('confirmation')?.classList.remove('d-none');
        } else {
          document.getElementById('erreur')?.classList.remove('d-none');
        }
        this.cdr.detectChanges();
      }, 
      error: (e) => {
        switch(e.status) {
          case 401: 
            console.log("Erreur 401 : Unauthorized");
            break;
          case 403: 
            console.log("Erreur 403 : Forbidden");
            break;
        }
      }
    });
  }

}
