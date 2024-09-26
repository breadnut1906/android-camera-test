import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonList,
  IonLabel,
  IonItem,
  IonInput,
  IonFab,
  IonFabButton,
  IonIcon,
  IonTab,
  IonTabs,
  IonTabBar,
  IonTabButton
} from '@ionic/angular/standalone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonList,
    IonLabel,
    IonItem,
    IonInput,
    IonFab,
    IonFabButton,
    IonIcon,
    IonTab,
    IonTabs,
    IonTabBar,
    IonTabButton,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonList,
    IonLabel,
    IonItem,
    IonInput,
    IonFab,
    IonFabButton,
    IonIcon,
    IonTab,
    IonTabs,
    IonTabBar,
    IonTabButton,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class IonicUiComponentsModule { }
