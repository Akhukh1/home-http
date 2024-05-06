/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
import createRequest from './api/createRequest';
import Ticket from './Ticket';

export default class TicketService {
  list(callback) {
    const options = {
      method: 'GET',
      body: 'http://localhost:7070?method=allTickets',
      callback: callback
    };

    const response = createRequest(options);

  }

  get(id, callback) {}

  create(data, callback) {
    // data.append('id', null);
    // data.append('status', false);
    const name = data.get('name')
    console.log(name)
    const description = data.get('description');
    console.log(description)
    // const status = data.append('status', false);

    // const ticket = new Ticket('null', name, description, false,);

    // ticket.id = 'null';
    // ticket.name = name;
    // ticket.description = description;
    // ticket.status = false;

    const ticket = {
      id: null,
      name: encodeURIComponent(name),
      description: encodeURIComponent(description),
      status: false,
      created:Date.now()
    }

    // const ticket = 


    console.log(ticket)

    const options = {
      method: 'POST',
      body: 'http://localhost:7070?method=createTicket',
      callback: callback,
      data: ticket
    };

    const response = createRequest(options);
  }

  update(id, data, callback) {}

  delete(id, callback) {}
}
