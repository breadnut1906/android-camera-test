import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { IonicUiComponentsModule } from './modules/ionic-ui-components/ionic-ui-components.module';
import { IonicIconsService } from './services/ionic-icons.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, IonicUiComponentsModule],
})
export class AppComponent {
  constructor(private ionicIcon: IonicIconsService) {}
}
