import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private monHttpClient: HttpClient){}

  getJsonData() {
    return this.monHttpClient.get('http://exercice-api.loc/yummynouilles.php', {
      headers: { "Authorization": "VBnAzKpOLlf5DZSNpNuXJmvg4"},
      responseType: 'text'
    })
  }

  postFormData(formValues: FormData) {
    return this.monHttpClient.post('http://exercice-api.loc/yummynouilles.php', formValues, {
      headers: { "Authorization": "VBnAzKpOLlf5DZSNpNuXJmvg4"},
      responseType: 'text'
    })
  }

}
