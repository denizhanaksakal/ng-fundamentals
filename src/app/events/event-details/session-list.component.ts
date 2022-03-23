import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ISession } from '../shared';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html',
})
export class SessionListComponent implements OnChanges {
  @Input() sessions: ISession[];
  @Input() filterBy: string;
  @Input() sortBy: string;
  filteredSessions: ISession[];

  ngOnChanges(): void {
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortBy === 'name'
        ? this.filteredSessions.sort(sortByNameAsc)
        : this.filteredSessions.sort(sortByVotesDesc);
    }
  }

  filterSessions(filter) {
    if (filter === 'all') {
      this.filteredSessions = this.sessions.slice(0); //duplicated
    } else {
      this.filteredSessions = this.sessions.filter((session) => {
        return session.level.toLocaleLowerCase() === filter;
      });
    }
  }
}

function sortByNameAsc(sl: ISession, s2: ISession) {
  if (sl.name > s2.name) return 1;
  else if (sl.name === s2.name) return 0;
  else return -1;
}
function sortByVotesDesc(sl: ISession, s2: ISession) {
  return s2.voters.length - sl.voters.length;
}
