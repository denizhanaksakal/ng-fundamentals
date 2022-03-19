import { Component, Input } from '@angular/core';
@Component({
  selector: 'events-thumbnail',
  template: `
    <div class="well hoverwell thumbnail">
      <h2>{{ eventDetails.name }}</h2>
      <div>Date: {{ eventDetails.date }}</div>
      <div>Time: {{ eventDetails.time }}</div>
      <div>Price: \${{ eventDetails.price }}</div>
      <div>
        <span>Location: {{ eventDetails.location.address }}</span>
        <span class="pad-left"
          >{{ eventDetails.location.city }}, {{ eventDetails.location.country }}
        </span>
      </div>
    </div>
  `,
  styles: [
    `
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
}
