import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { MessagingService } from '../../../core/services/messaging.service';
import { message } from '../../../core/models/message.interface';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.component.html',
  styleUrl: './mensajeria.component.css'
})
export class MensajeriaComponent {  
  @ViewChild("messageContainer") private messageContainer!: ElementRef<HTMLDivElement>;
  
  userID : number = -1;
  lastIndex: number = 0;

  constructor(
    private authService: AuthService,
    private datePipe:DatePipe,
    private messagingService: MessagingService
  ){}

  conversations: any[] = []
  selectedConversation: any = null;

  messages : message[] = []

  newMessage: string = '';
  rows: number = 1;

  page: number = 0;
  pageSize: number = 20;
  lastMessageId: number = 0;
  isLoading: boolean = false;
  noMoreMessages: boolean = false;

  messagesIdentity = (i: number) => this.messages[this.messages.length - 1 - i];

  create(recipientId: number){
    this.messagingService.sendNewConversation(recipientId);
  }
 
  getSortedConversations(){
    return this.conversations.slice().sort((a, b) => {
      const dateA = a.lastMessage ? new Date(a.lastMessage.createdAt).getTime() : new Date(a.created_at).getTime();
      const dateB = b.lastMessage ? new Date(b.lastMessage.createdAt).getTime() : new Date(b.created_at).getTime();
      return dateB - dateA; // Orden descendente, más reciente primero
    });
  }

  ngOnInit(){
    this.userID = this.authService.getUserInfo().id;

    this.messagingService.getConversations().subscribe(conversations =>{
      this.conversations = conversations.map(conversation => {
        conversation.created_at = this.datePipe.transform(conversation.created_at, 'MMMM d, y HH:mm') ?? "Fecha no disponible";
        if(conversation.lastMessage){
          conversation.lastMessage.createdAt = this.datePipe.transform(conversation.lastMessage.createdAt, 'MMMM d, y HH:mm') ?? "Fecha no disponible";
        }
        return conversation;
      });
    })

    this.messagingService.getChatMessages().subscribe(message => {
      if(message && this.selectedConversation){
        if(message.conversation == this.selectedConversation.id){
          this.messages.push(message);
          this.lastIndex = this.messages.length - 1;
        }
      }
    })

    this.lastIndex = this.messages.length - 1;
  }
  
  selectConversation(conversation:any) {
    if(this.selectedConversation == conversation){
      return;
    }
    this.selectedConversation = conversation;
    this.messages = this.messagingService.getCacheMessages(this.selectedConversation.id);
    this.noMoreMessages = this.messagingService.getCacheNoMoreMessages(this.selectedConversation.id);
    this.lastMessageId = this.messagingService.getCacheLastMessageId(this.selectedConversation.id);
    this.page = this.messagingService.getCachePage(this.selectedConversation.id);
    this.lastIndex = this.messages.length - 1;

    if(this.messagingService.getCacheFirstLoad(this.selectedConversation.id)){
      this.loadOlderMessages();
    }
    setTimeout(() => this.scrollToBottom(), 0);
  }

  loadOlderMessages(): void {
    this.isLoading = true;
    this.messagingService
    .getOlderMessages(this.selectedConversation.id, this.lastMessageId, this.userID, this.page, this.pageSize)
      .subscribe((messages) => {
        messages.reverse()
        messages.forEach(message => {
          message.createdAt = this.datePipe.transform(message.createdAt, 'MMMM d, y HH:mm:ss.SSS') ?? "Fecha no disponible";
        });
        this.messages = [...messages, ...this.messages];

        this.lastIndex = this.messages.length - 1;
        this.messagingService.updateCacheMessages(this.selectedConversation.id, messages)
        this.messagingService.updateCacheNoMoreMessages(this.selectedConversation.id, messages.length < this.pageSize)
        this.noMoreMessages = messages.length < this.pageSize;

        if( this.selectedConversation.lastMessage){
          this.selectedConversation.lastMessage.read = true;
          this.messagingService.sendUpdate();
        }
        this.page++;

        this.messagingService.updateCachePage(this.selectedConversation.id, this.page)
        this.messagingService.updateCacheFirstLoad(this.selectedConversation.id, false)

        this.isLoading = false;
      });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const msg = {id: 0, content:this.newMessage, sender:this.userID, isRead:false, createdAt:this.datePipe.transform(new Date(), 'MMMM d, y HH:mm') ?? "Fecha no disponible"}
      this.messages.push(msg);
      this.lastIndex+= 1;
      this.newMessage = '';
      this.messagingService.sendNewMessage(this.selectedConversation.id, msg.content, this.selectedConversation.user_1 !== this.userID ? this.selectedConversation.user_1 : this.selectedConversation.user_2);
      this.selectedConversation.lastMessage = msg; 
    }
    setTimeout(() => this.scrollToBottom(), 0);
  }

  onScroll(event: Event): void {
    if(this.messageContainer){
      const container = this.messageContainer.nativeElement;

      const isAtRange= container.scrollHeight + container.scrollTop - container.clientHeight < 100;
      if (isAtRange && !this.isLoading && !this.noMoreMessages) {
        this.loadOlderMessages();
      }
    }
  }
  

  adjustRows(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight - 20, 130) + "px";
    setTimeout(() => {
      if(this.messageContainer){
        this.messageContainer.nativeElement.style.scrollBehavior = 'auto'
        this.scrollToBottom()
        this.messageContainer.nativeElement.style.scrollBehavior = 'smooth'
      }
    }, 0);
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (!event.shiftKey) {
        event.preventDefault();
        this.sendMessage();
      } else {
        return;
      }
    }
  }
  scrollToBottom(): void {
    
    try {
      if(this.messageContainer){
        this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
    }
  }
}
