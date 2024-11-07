import { Component } from '@angular/core';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.component.html',
  styleUrl: './mensajeria.component.css'
})
export class MensajeriaComponent {
  
  chats = [
    {
      name: 'Chat 1',
      lastMessage: 'Hola, ¿cómo estás?',
      lastMessageTime: '10:30 AM',
      messages: ['Hola', '¿Cómo estás?','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a']
    },
    {
      name: 'Chat 2',
      lastMessage: '¡Hola! ¿Qué tal?',
      lastMessageTime: '11:15 AM',
      messages: ['¡Hola!', '¿Qué tal?']
    },
    {
      name: 'Chat 3',
      lastMessage: '¿Cómo estás? ¿Tienes tiempo?',
      lastMessageTime: '12:00 PM',
      messages: ['¿Cómo estás?', '¿Tienes tiempo?']
    }
  ];

  selectedChat:any = null;
  newMessage: string = '';

  selectChat(chat:any) {
    this.selectedChat = chat;
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.selectedChat.messages.push(this.newMessage);
      this.newMessage = '';
    }
  }
}
