import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  weight: number;
  height: number;

  constructor(private toastController: ToastController) { }

  isFormValid() {
    return (this.height && this.weight && this.height > 0 && this.weight > 0);
  }

  onCalculate() {
    const imc = this.weight / (this.height * this.height);
    let result_msg = `IMC = ${imc.toFixed(2)}`

    if (imc < 18.5) {
      result_msg += ' - Magreza';
    } else if (imc >= 18.5 && imc < 25) {
      result_msg += ' - Normal';
    } else if (imc >= 25 && imc < 30) {
      result_msg += ' - Sobrepeso';
    } else if (imc >= 30 && imc < 40) {
      result_msg += ' - Obesidade';
    } else {
      result_msg += ' - Obesidade Grave';
    }

    this.showMessage(result_msg);
  }

  async showMessage(msg: string) {
    const previousToast = await this.toastController.getTop();
    if (previousToast) {
      await this.toastController.dismiss();
    }

    const toast = await this.toastController.create(
      {
        message: msg,
        color: 'light',
        buttons: [
          {
            icon: 'close'
          }
        ]
      }
    );
    toast.present();
  }
}
