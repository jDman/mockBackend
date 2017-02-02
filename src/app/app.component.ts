import { Component, OnInit } from '@angular/core';

import {Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

import {TicketComponent} from './ticket/ticket.component';
import {TicketService} from './ticket.service';
import {Ticket} from './ticket';

import * as _ from "lodash";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Fake Tickets DB
  private db: Ticket[] = [
    new Ticket(
      '1', 'Missing Exception', 'John Smith',
      'Method XYZ should throw exception in case ABC', 0),
    new Ticket(
      '2', 'Log errors', 'John Smith',
      'Logs need to be persisted to a local file', 24),
    new Ticket(
      '3', 'Update AngularJS', 'John Smith',
      'Need to update the App to AngularJS version 1.5', 0),
    new Ticket(
      '4', 'Border is missing', 'Jane Doe',
      'The element div.demo has no border defined', 100),
    new Ticket(
      '5', 'Introduce responsive grid', 'Jane Doe',
      'Implement reponsive grid for better displays on mobile devices', 17)
  ];

  ngOnInit() {
    let singleTicketMatcher = /\/api\/ticket\/([0-9]+)/i;
    this.backend.connections.subscribe( c => {
      // return all tickets
      // GET: /ticket
      if (c.request.url === "http://localhost:8080/api/ticket" &&
        c.request.method === 0) {
        let res = new Response(new ResponseOptions({
          body: JSON.stringify(this.db)
        }));

        c.mockRespond(res);
      }
      // return ticket matching the given id
      // GET: /ticket/:id
      else if (c.request.url.match(singleTicketMatcher) && c.request.method === 0) {
        let matches = this.db.filter( (t) => {
          return t._id == c.request.url.match(singleTicketMatcher)[1]
        });

        c.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(matches[0])
        })));
      }
      // Add or update a ticket
      // POST: /ticket
      else if (c.request.url === 'http://localhost:8080/api/ticket' && c.request.method === 1) {
        let newTicket: Ticket = JSON.parse(c.request._body);

        let existingTicket = this.db.filter( (ticket: Ticket) => { return ticket._id == newTicket._id});
        if (existingTicket && existingTicket.length === 1) {
          Object.assign(existingTicket[0], newTicket);

          c.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(existingTicket[0])
          })));
        } else {
          let idArr: Array<number> = _.map(this.db, (t) => {
            return parseInt(t._id, 10);
          });

          newTicket._id = Math.floor(_.max(idArr)) + 1 + '';

          this.db.push(newTicket);

          c.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(newTicket)
          })));
        }
      }
      // Delete a ticket
      // DELETE: /ticket/:id
      else if (c.request.url.match(singleTicketMatcher) && c.request.method === 3) {
        let ticketId = c.request.url.match(singleTicketMatcher)[1];
        let pos = _.indexOf(_.map(this.db, '_id'), ticketId);

        this.db.splice(pos, 1);

        c.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify({})
        })));
      }

    });
  }

  constructor(
    private service: TicketService,
    private backend: MockBackend) {}
}
