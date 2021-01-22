import { Injectable } from '@angular/core';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  async showSweetAlertConfirm(title: string, html: any, confirmButtonText: string, denyButtonText: string): Promise < any > {
    return swal.fire({
      html,
      title: `<h4>${title}</h4>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText,
      denyButtonText,
      allowOutsideClick: false,
      allowEscapeKey: false
    });
  }

}
