import { Component } from '@angular/core';
import { IonicUiComponentsModule } from '../modules/ionic-ui-components/ionic-ui-components.module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ IonicUiComponentsModule ],
})
export class HomePage { }
