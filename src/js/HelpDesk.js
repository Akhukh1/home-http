import TicketService from "./TicketService";
import TicketForm from "./TicketForm";
import TicketView from './TicketView';

/**
 *  Основной класс приложения
 * */
export default class HelpDesk {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("This is not HTML element!");
    }

    this.container = container;
    this.ticketService = new TicketService();
  }

  init() {
    const button = document.createElement('button');
    const addButton = this.container.appendChild(button);
    addButton.textContent = 'Добавить тиккет';
    addButton.classList.add('add-button');
    addButton.addEventListener('click', () => {
      this.addTicket();
    });
    this.list(this.container);
  }

  list(container) {
    // const ticket = new TicketView;
    // ticket.rendericket(this.container);

    const response = this.ticketService.list(callback);
    // console.log('response HelpDesk ');
    // console.log(response);

    const ticketsBlock = document.createElement('div');
    const ticketsContainer = this.container.appendChild(ticketsBlock);
    ticketsContainer.classList.add('tickets');

    const ticketContainer = document.querySelector('.tickets');
    
    function callback(response) {

      for (let i = 0; i < response.length; i++) {
        console.log(response[i]);
        const ticket = new TicketView;
        ticket.rendericket(ticketContainer, response[i]);
      }

      const tickets = document.querySelector('.tickets');
      tickets.addEventListener('click', (e) => {
        if (e.target.closest('.implement-container')) {
          console.log('Ихиенение статуса');
          console.log(e.target.getAttribute('id'));
        } else if (e.target.closest('.edit-container')) {
          console.log('Редактирование');
          console.log(e.target.getAttribute('id'));
        } else if (e.target.closest('.delete-container')) {
          console.log('Удаление');
          console.log(e.target.getAttribute('id'));
        } else if (e.target.closest('.ticket-container')) {
          console.log('Подробнее');
          console.log(e.target.getAttribute('id'));
        }
      });

    }

  }

  addTicket() {
    const newTicket = new TicketForm;
    newTicket.renderFormTicket('Добавить тикет');

    const popUp = document.querySelector('.popup');

    const formSbmit = document.querySelector('form');

    formSbmit.addEventListener('submit', (e) => { 
      e.preventDefault();
  
      let formData = new FormData(formSbmit);
      const response = this.ticketService.create(formData, callback);

      newTicket.removeForm(popUp);
      // this.list(this.container);
    });

    function callback(response) {
      console.log('response');
      console.log(response);
      
    }

  }

}
