// *  Класс для создания формы создания нового тикета
// * */
export default class TicketForm {
  constructor(nameForm) {
    this.nameForm = nameForm;
  }

  renderFormTicket(nameForm) {

    const popUp = document.createElement('div');
    const popUpContainer = document.body.appendChild(popUp);
    popUpContainer.classList.add('popup');

    const form = document.createElement('form');
    const popUpForm = popUpContainer.appendChild(form);
    popUpForm.classList.add('form');

    const popUpNameForm = document.createElement('div');
    const popUpNameFormContainer = popUpForm.appendChild(popUpNameForm);
    // popUpForm.setAttribute('action', 'http://localhost:7070');
    popUpNameFormContainer.classList.add('form-name')
    popUpNameFormContainer.textContent = nameForm;

    let inputName = document.createElement('div');
    let inputFormName = popUpForm.appendChild(inputName);
    inputFormName.classList.add('input-name');
    inputFormName.textContent = 'Краткое описание';

    // const inputShortDescription = document.createElement('input');
    // inputShortDescription.setAttribute('type', 'textarea');
    // const shortDescription = popUpForm.appendChild(inputShortDescription);
    // shortDescription.classList.add('short-description');

    const inputShortDescription = document.createElement('textarea');
    inputShortDescription.setAttribute('rows', '2');
    inputShortDescription.setAttribute('name', 'name');
    const shortDescription = popUpForm.appendChild(inputShortDescription);
    shortDescription.classList.add('short-description');

    inputName = document.createElement('div');
    inputFormName = popUpForm.appendChild(inputName);
    inputFormName.classList.add('input-name');
    inputFormName.textContent = 'Подробное описание';

    // const inputDetailedDescription = document.createElement('input');
    // inputDetailedDescription.setAttribute('type', 'textarea');
    // const detailedDescription = popUpForm.appendChild(inputDetailedDescription);
    // detailedDescription.classList.add('detailed-description');

    const inputDetailedDescription = document.createElement('textarea');
    inputDetailedDescription.setAttribute('rows', '3');
    inputDetailedDescription.setAttribute('name', 'description');
    const detailedDescription = popUpForm.appendChild(inputDetailedDescription);
    detailedDescription.classList.add('detailed-description');

    const formButtonsContainer = document.createElement('div');
    const formButtons = popUpForm.appendChild(formButtonsContainer);
    formButtons.classList.add('form-buttons');

    let button = document.createElement('button');
    const formCancel = formButtons.appendChild(button);
    formCancel.setAttribute('type', 'button');
    formCancel.textContent = 'Отмена';
    formCancel.classList.add('cancel-btn');

    button = document.createElement('button');
    const formSubmit = formButtons.appendChild(button);
    formSubmit.setAttribute('type', 'submit');
    formSubmit.textContent = 'ОК';
    formSubmit.classList.add('sumit-btn');

    // this.formSubmit(popUp);
    this.cancelFopm(popUp);
  }

  // formSubmit(popUp) {
  //   // const form = document.querySelector('.form');


  //   // form.addEventListener('submit', (e) => {
  //   //   e.preventDefault();
  //   //     console.log('submit');
  //   //     this.removeForm(popUp);
  //   // });
  // }

  cancelFopm(popUp) {
    const canselBtn = document.querySelector('.cancel-btn');
    canselBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.removeForm(popUp);
    });
  }

  removeForm(form) {
    form.remove();
  }

}
