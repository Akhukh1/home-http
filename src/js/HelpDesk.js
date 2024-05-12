import TicketService from './TicketService';
import TicketForm from './TicketForm';
import TicketView from './TicketView';

/**
 *  Основной класс приложения
 * */
export default class HelpDesk {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }

    this.container = container;
  }

  init() {
    const button = document.createElement('button');
    const addButton = this.container.appendChild(button);
    addButton.textContent = 'Добавить тикет';
    addButton.classList.add('add-button');

    addButton.addEventListener('click', () => {
      this.addTicket();
    });
    this.list(this.container);
  }

  list(container) {
    const ticketsBlock = document.createElement('div');
    const ticketsContainer = this.container.appendChild(ticketsBlock);
    ticketsContainer.classList.add('tickets');
    const ticketContainer = document.querySelector('.tickets');
    const callback = (response) => {
      for (let i = 0; i < response.length; i += 1) {
        TicketView.renderTicket(ticketContainer, response[i]);
      }
      this.listnerTicket(container);
    };
    TicketService.list(callback);
  }

  addTicket() {
    function callback(response) {
      const ticketContainer = document.querySelector('.tickets');
      TicketView.renderTicket(ticketContainer, response);
    }

    TicketForm.renderFormTicket('Добавить тикет');
    const popUp = document.querySelector('.popup');
    const formSbmit = document.querySelector('form');

    formSbmit.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(formSbmit);
      TicketService.create(formData, callback);
      TicketForm.removeForm(popUp);
    });
  }

  listnerTicket() {
    const tickets = document.querySelector('.tickets');

    tickets.addEventListener('click', (e) => {
      if (e.target.closest('.implement-container')) {
        const id = e.target.getAttribute('id');
        const statusContainer = e.target.closest('.implement-container');
        if (e.target.closest('.implement-container').textContent === '') {
          this.setStatus(id, statusContainer);
        }
      } else if (e.target.closest('.edit-container')) {
        const id = e.target.getAttribute('id');
        const ticket = e.target.closest('.ticket-info');
        const descr = ticket.querySelector('.shortdescr-container');
        this.changeTikcet(id, descr);
      } else if (e.target.closest('.delete-container')) {
        const id = e.target.getAttribute('id');
        const ticket = e.target.closest('.ticket-info');
        this.deleteTicket(id, ticket);
      } else if (e.target.closest('.ticket-info')) {
        const ticket = e.target.closest('.ticket-info');
        const ticketDiscr = ticket.querySelector('.ticket-description');
        if (ticketDiscr) {
          ticketDiscr.remove();
        } else {
          const id = e.target.getAttribute('id');
          this.viewDescription(id, ticket);
        }
      }
    });
  }

  viewDescription(id, container) {
    const ticketContainer = document.createElement('div');
    const ticketDiscr = container.appendChild(ticketContainer);
    ticketDiscr.classList.add('ticket-description');

    const callback = (response) => {
      if (response.description) {
        ticketDiscr.textContent = response.description;
      } else {
        ticketDiscr.textContent = 'Описание отсутствует';
      }
    };

    TicketService.get(id, callback);
  }

  setStatus(id, statusContainer) {
    const callback = () => {
      statusContainer.textContent = String.fromCharCode(10004);
    };
    const data = { status: true };
    TicketService.update(id, data, callback);
  }

  deleteTicket(id, container) {
    const popUp = document.createElement('div');
    const popUpContainer = document.body.appendChild(popUp);
    popUpContainer.classList.add('popup');

    let div = document.createElement('div');
    const popUpDiv = popUpContainer.appendChild(div);
    popUpDiv.classList.add('popup-delete');

    div = document.createElement('div');
    const title = popUpDiv.appendChild(div);
    title.classList.add('form-name');
    title.textContent = 'Удалить тикет';

    div = document.createElement('div');
    const subj = popUpDiv.appendChild(div);
    subj.classList.add('popup-subj');
    subj.textContent = 'Вы уверены, что зотите удалить тикет? это действие необратимо.';

    const buttonsContainer = document.createElement('div');
    const buttons = popUpDiv.appendChild(buttonsContainer);
    buttons.classList.add('form-buttons');

    let button = document.createElement('button');
    const btnCancel = buttons.appendChild(button);
    btnCancel.setAttribute('type', 'button');
    btnCancel.textContent = 'Отмена';
    btnCancel.classList.add('cancel-btn');

    button = document.createElement('button');
    const btnSubmit = buttons.appendChild(button);
    btnSubmit.setAttribute('type', 'button');
    btnSubmit.textContent = 'ОК';
    btnSubmit.classList.add('sumit-btn');

    const btnCanselDelete = document.querySelector('.cancel-btn');
    btnCanselDelete.addEventListener('click', () => {
      popUpContainer.remove();
    });

    const btnSubmitDelete = document.querySelector('.sumit-btn');
    btnSubmitDelete.addEventListener('click', () => {
      const callback = (xhrStatus) => {
        if (xhrStatus === 204) {
          container.remove();
        }
      };

      TicketService.delete(id, callback);
      popUpContainer.remove();
    });
  }

  changeTikcet(id, descr) {
    TicketForm.renderFormTicket('Изменить тикет');
    const popUp = document.querySelector('.popup');
    const formSbmit = document.querySelector('form');

    formSbmit.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(formSbmit);
      let  data = {};
      if (formData.get('name') !== '') {
        data.name = formData.get('name');
      }
      if (formData.get('description') !== '') {
        data.description = formData.get('description');
      }
      const callback = (response) => {
        const ticket = [...response].find((element) => element.id === id);
        descr.textContent = ticket.name;
      };
      TicketService.update(id, data, callback);

      TicketForm.removeForm(popUp);
    });
  }
}
