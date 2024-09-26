import { Injectable } from '@angular/core';
import { addIcons } from 'ionicons';
import { happyOutline, homeOutline, qrCodeOutline, scan, warningOutline } from 'ionicons/icons';

@Injectable({
  providedIn: 'root'
})
export class IonicIconsService {

  constructor() { 
    this.onRegisterIcons();
  }

  private onRegisterIcons() {
    console.log('Registering icons...');
    addIcons({
      'scan': scan,
      'warning-outline': warningOutline,
      'home-outline': homeOutline,
      'qr-code-outline': qrCodeOutline,
      'happy-outline': happyOutline
    })
  }
}
