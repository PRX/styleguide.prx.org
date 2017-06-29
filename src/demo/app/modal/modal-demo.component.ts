import { Component } from '@angular/core';
import { ModalService } from 'ngx-prx-styleguide';

@Component({
  selector: 'modal-demo',
  template: `
    <section class="main demo">
      <h1>ModalService and ModalComponent</h1>
      <p>
        The Modal Service and Component are for displaying modals within the application. The Modal Component should be
        included in the application at the top level of the app component as it is in this demo app. The Modal Service is
        injected into components that show modals.
      </p>
      <aside>
        <h2>Usage:</h2>
        <ul>
          <li>
            Classes inheriting from BaseModel should call init() in their constructors to set the parent, decode the underlying
            HalDoc, isNew, original values, and RELATIONS
          </li>
          <li>
            Fields that can be modified are to be included in the SETABLE array
          </li>
          <li>
            Validation rules for fields can be set in VALIDATORS
          </li>
          <li>
            <code>alert(title: string, body?: string, callback?: Function)</code> opens an alert modal and if provided,
            calls the callback function when the user clicks the primary button
          </li>
          <li>
            <code>confirm(title: string, 
              message: string, callback: Function, primaryButtonLabel = 'Okay', secondaryButtonLabel = 'Cancel')</code>
            opens a confirmation modal and calls the callback function with true or false depending if the user clicked
            the primary or the secondary button
          </li>
          <li>
            <code>show(options: ModalState)</code> opens a modal with the given ModalState
          </li>
          <li>
            <code>hide()</code> closes modal if open
          </li>
        </ul>
        Example:
        <button (click)="alert()">Alert</button>
        <button (click)="confirm()">Confirm</button>
        <button (click)="show()">Show</button>
      </aside>
    </section>
  `,
})
export class ModalDemoComponent {
  constructor(private modal: ModalService) {}

  alert() {
    this.modal.alert('Would you look at that', 'Something happened that you really need to be aware of.', () => {});
  }

  confirm() {
    this.modal.confirm('Are you sure', 'You may have done something that I\'m not sure you really meant to do', () => {});
  }

  show() {
    this.modal.show({
      title: 'Descriptive Title',
      body: 'Detailed information goes here',
      primaryButton: 'We Cool',
      secondaryButton: 'Nope',
      buttonCallback: () => {}
    });
  }
}
