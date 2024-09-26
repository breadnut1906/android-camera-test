import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

import { IonicUiComponentsModule } from 'src/app/modules/ionic-ui-components/ionic-ui-components.module';
import { IonicIconsService } from 'src/app/services/ionic-icons.service';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss'],
  standalone: true,
  imports: [ IonicUiComponentsModule ]
})
export class QrScannerComponent implements OnInit {
  isSupported: boolean = false;
  barcode: Barcode[] = [];

  constructor(private alertController: AlertController, private ionicIcon: IonicIconsService) { }

  ngOnInit(): void {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported
    })
  }

  async onScan(): Promise<void> {
    const granted = await this.onRequestPermission();
    if (!granted) {
      this.onPresentAlert();
      return;
    }

    const { barcodes } = await BarcodeScanner.scan();
    this.barcode.push(...barcodes)
  }

  async onRequestPermission(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited'
  }

  async onPresentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission Denied',
      message: 'Please grant camera permission to use the scanner',
      buttons: ['ok']
    });
    await alert.present();
  }
}
