import { Component, Input, Output, EventEmitter } from '@angular/core'
@Component({
    selector: 'events-thumbnail',
    template: `
    <div class="well hoverwell thumbnail">
      <h2>{{eventDetails.name}}</h2>
      <div>Date: {{eventDetails.date}}</div>
      <div>Time: {{eventDetails.time}}</div>
      <div>Price: \${{eventDetails.price}}</div>
      <div>
        <span>Location: {{eventDetails.location.address}}</span>
        <span>&nbsp;</span>
        <span>{{eventDetails.location.city}}, {{eventDetails.location.country}}
          </span>
      </div>
      <button class="btn btn-primary" (click)="handleClickMe()">Click me!</button>
    </div>
    `
})
export class EventThumbnailComponent {
    @Input() eventDetails: any
    @Output() eventClick = new EventEmitter();

    handleClickMe() {
        this.eventClick.emit(this.eventDetails);
    }
}