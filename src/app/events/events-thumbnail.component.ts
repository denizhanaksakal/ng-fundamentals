import { Component, Input } from '@angular/core';
@Component({
  selector: 'events-thumbnail',
  template: `
    <div class="well hoverwell thumbnail">
      <h2>{{ eventDetails?.name }}</h2>
      <div>Date: {{ eventDetails?.date }}</div>
      <div [ngSwitch]="eventDetails?.time" [ngStyle]="checkStartTime()">
        Time: {{ eventDetails?.time }}
        <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
        <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
        <span *ngSwitchDefault>(Normal Start)</span>
      </div>
      <div>Price: \${{ eventDetails?.price }}</div>
      <div *ngIf="eventDetails?.location">
        <span>Location: {{ eventDetails?.location?.address }}</span>
        <span class="pad-left"
          >{{ eventDetails?.location?.city }},
          {{ eventDetails?.location?.country }}
        </span>
      </div>
      <div *ngIf="eventDetails?.onlineUrl">
        Online URL: {{ eventDetails?.onlineUrl }}
      </div>
    </div>
  `,
  styles: [
    `
      .thumbnail {
        min-height: 210px;
      }
      .pad-left {
        margin-left: 10px;
      }
      .well div {
        color: #bbb;
      }
    `,
  ],
})
export class EventThumbnailComponent {
  @Input() eventDetails: any;

  checkStartTime() {
    if (this.eventDetails && this.eventDetails.time === '8:00 am')
      return { color: 'green', 'font-weight': 'bold' };
    else if (this.eventDetails && this.eventDetails.time === '10:00 am')
      return { color: 'red', 'font-weight': 'bold' };
    else return {};
  }
}
