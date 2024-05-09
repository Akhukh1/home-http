/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
export default class TicketView {
  static renderTicket(container, data) {
    const ticketInfo = document.createElement('div');
    const ticketInfoContainer = container.appendChild(ticketInfo);
    ticketInfoContainer.classList.add('ticket-info');
    ticketInfoContainer.setAttribute('id', data.id);

    const ticket = document.createElement('div');
    const ticketContainer = ticketInfoContainer.appendChild(ticket);
    ticketContainer.classList.add('ticket-container');
    ticketContainer.setAttribute('id', data.id);

    let action = document.createElement('div');
    let actionContainer = ticketContainer.appendChild(action);
    actionContainer.classList.add('implement-container');
    actionContainer.setAttribute('id', data.id);
    if (data.status) {
      actionContainer.textContent = String.fromCharCode(10004);
    }

    let content = document.createElement('div');
    let contentContainer = ticketContainer.appendChild(content);
    contentContainer.classList.add('shortdescr-container');
    contentContainer.setAttribute('id', data.id);
    contentContainer.textContent = data.name;

    content = document.createElement('div');
    contentContainer = ticketContainer.appendChild(content);
    contentContainer.classList.add('date-container');
    contentContainer.setAttribute('id', data.id);
    contentContainer.textContent = new Date(data.created).toLocaleString();

    action = document.createElement('div');
    actionContainer = ticketContainer.appendChild(action);
    actionContainer.classList.add('edit-container');
    actionContainer.setAttribute('id', data.id);
    actionContainer.textContent = String.fromCharCode(9998);

    action = document.createElement('div');
    actionContainer = ticketContainer.appendChild(action);
    actionContainer.classList.add('delete-container');
    actionContainer.setAttribute('id', data.id);
    actionContainer.textContent = String.fromCharCode(10006);
  }
}
