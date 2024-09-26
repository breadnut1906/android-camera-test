import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'qr',
    loadComponent: () => import('./views/qr-scanner/qr-scanner.component').then((m) => m.QrScannerComponent)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'face-detection',
    loadComponent: () => import('./views/face-detection/face-detection.page').then( m => m.FaceDetectionPage)
  },
];
