import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contact = { name: '', email: '', message: '' };

  submitForm() {
    console.log('Formulário enviado:', this.contact);
    this.contact = { name: '', email: '', message: '' }; // Limpa o formulário
  }
}