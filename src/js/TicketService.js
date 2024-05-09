/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
import createRequest from './api/createRequest';

export default class TicketService {
  static list(callback) {
    const options = {
      method: 'GET',
      body: 'http://localhost:7070?method=allTickets',
      callback,
    };
    createRequest(options);
  }

  static get(id, callback) {
    const options = {
      method: 'GET',
      body: `http://localhost:7070?method=ticketById&id=${id}`,
      callback,
    };
    createRequest(options);
  }

  static create(data, callback) {
    const name = data.get('name');
    const description = data.get('description');

    const ticket = {
      name,
      description,
      status: false,
      created: Date.now(),
    };

    const options = {
      method: 'POST',
      body: 'http://localhost:7070?method=createTicket',
      callback,
      data: JSON.stringify(ticket),
    };

    createRequest(options);
  }

  static update(id, data, callback) {
    const options = {
      method: 'POST',
      body: `http://localhost:7070?method=updateById&id=${id}`,
      callback,
      data: JSON.stringify(data),
    };

    createRequest(options);
  }

  static delete(id, callback) {
    const options = {
      method: 'GET',
      body: `http://localhost:7070?method=deleteById&id=${id}`,
      callback,
      // data: JSON.stringify(data)
    };

    createRequest(options);
  }
}
