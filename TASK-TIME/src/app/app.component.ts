import { GatewayService } from './Services/gateway.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TASK-TIME';
  constructor(private gateway: GatewayService){}
}
