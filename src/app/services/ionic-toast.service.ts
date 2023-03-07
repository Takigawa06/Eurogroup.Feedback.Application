import { Injectable } from '@angular/core';
import { PRIMARY_OUTLET } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IonicToastService {

  private myToast: any;

  constructor(
    public toast: ToastController
  ) { }


  showToast() {
    this.myToast = this.toast.create({
      message: 'Grazie per il feedback',
      duration: 1000,
      position: 'middle',
      color: 'success',
      animated : true,
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }
  
}
