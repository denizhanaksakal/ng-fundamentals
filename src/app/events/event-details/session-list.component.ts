import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../../user/auth.service';
import { ISession } from '../shared';
import { VoterService } from './voter.service';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html',
})
export class SessionListComponent implements OnChanges {
  @Input() sessions: ISession[];
  @Input() filterBy: string;
  @Input() sortBy: string;
  @Input() eventId: number;
  filteredSessions: ISession[] = [];

  constructor(public auth: AuthService, public voterService: VoterService) {}

  ngOnChanges() {
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

  toggleVote(session: ISession) {
    if (this.userHasVoted(session)) {
      this.voterService.deleteVoter(
        this.eventId,
        session,
        this.auth.currentUser.userName
      );
    } else {
      this.voterService.addVoter(
        this.eventId,
        session,
        this.auth.currentUser.userName
      );
    }
    if (this.sortBy === 'votes') {
      this.filteredSessions.sort(sortByVotesDesc);
    }
  }

  userHasVoted(session: ISession) {
    return this.voterService.userHasVoted(
      session,
      this.auth.currentUser.userName
    );
  }
}

function sortByNameAsc(s1: ISession, s2: ISession) {
  if (s1.name > s2.name) return 1;
  else if (s1.name === s2.name) return 0;
  else return -1;
}
function sortByVotesDesc(s1: ISession, s2: ISession) {
  return s2.voters.length - s1.voters.length;
}
