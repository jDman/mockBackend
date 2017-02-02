import {Ticket} from './ticket';
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TicketService {
	tickets: Ticket[] = [];

	constructor(private http: Http) {

	}

	addNewTicket() {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');

    var newTicket = new Ticket("0", 'New Ticket', 'Nobody', 'Enter ticket description here', 0);

		this.http
			.post('http://localhost:8080/api/ticket', JSON.stringify(newTicket), headers)
			.map(res => res.json())
			.subscribe(
				data => this.tickets.push(data),
				err => this.logError(err),
				() => console.log('Updated Ticket')
			);
	}

	saveTicket(ticket: Ticket) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');

		this.http
			.post('http://localhost:4200/api/ticket', JSON.stringify(ticket), headers)
			.map(res => res.json())
			.subscribe(
				null,
				err => this.logError(err),
				() => console.log('Updated Ticket')
			);
	}

	deleteTicket(ticket: Ticket) {
		this.http
			.delete('http://localhost:8080/api/ticket/' + ticket._id)
			.map(res => res.text())
			.subscribe(
				data => {
					var midx = -1;

					this.tickets.forEach( (t, idx) => {
						if (t._id == ticket._id) {
							midx = idx;
						}
					});

					this.tickets.splice(midx, 1);
				},
				err => this.logError(err),
				() => console.log('Request for all tickets completed successfully')
			);
	}

	loadAllTickets() {
		this.http
			.get('http://localhost:8080/api/ticket')
			.map(res => {
        return res.json()
      })
			.subscribe(
				data => {
          this.tickets = data;
        },
				err => this.logError(err),
				() => console.log("Loaded all tickets")
			);
	}

  loadTicketById(id) {
    this.http
      .get('http://localhost:8080/api/ticket/' + id)
      .map(res => res.json())
      .subscribe(
        data => this.tickets = [data],
        err => this.logError(err),
        () => console.log("Loaded ticket with id " + id)
      );
  }

	logError(err) {
		console.error('There was an error: ' + err);
	}
}
