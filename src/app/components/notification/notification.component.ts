import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  @Input() errorMessage: string | null = '';

  constructor() { }

  refresh() {
    window.location.reload();
  };
}
