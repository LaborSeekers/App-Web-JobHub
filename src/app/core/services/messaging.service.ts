import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WebSocketService } from './websocket.service';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/enviroment';
import { message } from '../models/message.interface';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private newMessageSubject: BehaviorSubject<any> = new BehaviorSubject<message|null>(null);
  private newMessageUpdate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private conversations: any[] = [];
  private newConversation: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private conversationsIds: Set<number>= new Set();
  private conversationsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.conversations);

  clearMessagesCache(): void {
    this.messageCache = {};
    this.conversations = [];
    this.conversationsSubject.next(this.conversations);
    this.newMessageSubject.next(null);
    this.newMessageUpdate.next(false);
    this.newConversation.next(false);
    this.conversationsIds.clear();
  }

  constructor(
    private webSocketService: WebSocketService,
    private authService: AuthService,
    private datePipe:DatePipe,
    private http: HttpClient) {
      this.getAllConversations().subscribe(conversations => {
        this.conversations = conversations

        conversations.forEach(conversation => {
          this.conversationsIds.add(conversation.id);
        });
        this.initCache(conversations)

        this.conversationsSubject.next(this.conversations)
        this.webSocketService.getConnectionStatus().subscribe(isConnected => {
          if (isConnected) {
            this.subscribeToConversations(conversations)
            this.subscribeToNewConversation();
          }
        });
      })
      this.authService.getLogoutSignal().subscribe((signal)=>{
        if(signal){
          this.clearMessagesCache();
        }
      })
  }

  messageCache: { 
    [conversationId: number]: {
      messages: message[],
      noMoreMessages: boolean,
      lastMessageID: number,
      page: number,
      firstLoad: boolean 
    } 
  } = {};

  initCache(conversations: any[]){    
    conversations.forEach((conversation) => {
      this.messageCache[conversation.id] = { messages: [], noMoreMessages: false, lastMessageID: conversation.lastMessage? conversation.lastMessage.id + 1: 0, page: 0, firstLoad: true };
    })
  }
  addCache(conversation: any){
    this.messageCache[conversation.id] = { messages: [], noMoreMessages: false, lastMessageID: conversation.lastMessage? conversation.lastMessage.id + 1: 0, page: 0, firstLoad: true };
  }

  updateCacheMessages(conversationId: number, newMessages: message[]) {
    this.messageCache[conversationId].messages = [...newMessages, ...this.messageCache[conversationId].messages];
  }
  updateCacheNoMoreMessages(conversationId: number, bool: boolean){
    this.messageCache[conversationId].noMoreMessages = bool
  }
  updateCachePage(conversationId: number, page: number){
    this.messageCache[conversationId].page = page;
  }
  updateCacheFirstLoad(conversationId: number, bool: boolean){
    this.messageCache[conversationId].firstLoad = bool
  }
  getCacheMessages(conversationId: number) {
    return this.messageCache[conversationId].messages
  }
  getCacheNoMoreMessages(conversationId: number){
    return this.messageCache[conversationId].noMoreMessages
  }
  getCacheLastMessageId(conversationId: number){
    return this.messageCache[conversationId].lastMessageID
  }
  getCachePage(conversationId: number){
    return this.messageCache[conversationId].page
  }
  getCacheFirstLoad(conversationId: number){
    return this.messageCache[conversationId].firstLoad
  }



  private apiUrl = `${environment.apiUrl}/chat`;

  getUpdates(){
    return this.newMessageUpdate.asObservable();
  }
  sendUpdate(){
    this.newMessageUpdate.next(true);
  }

  getNewConversationCreated(){
    return this.newConversation.asObservable();
  }
  getConversations(){
    return this.conversationsSubject.asObservable();
  }
  getChatMessages() {
    return this.newMessageSubject.asObservable();
  }
  getAllConversations(): Observable<any[]>{
    let params = new HttpParams()
      .set("userId", this.authService.getUserInfo().id);

    return this.http.get<any[]>(`${this.apiUrl}/conversations`, {params});
  }
  getOlderMessages(conversationId: number, lastMessageId: number, userId: number,page: number, size: number): Observable<any[]> {
    const params = new HttpParams()
      .set('conversationId', conversationId.toString())
      .set('lastMessageId', lastMessageId.toString())
      .set('userId', userId)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any[]>(`${this.apiUrl}/older`, {params});
  }

  private subscribeToConversations(conversations: any[]) {
    conversations.forEach(conversation => {
      this.subscribeToConversation(conversation.id);
    });
  }

  private subscribeToConversation(id: number): void {
    const userId = this.authService.getUserInfo().id;
    const channel = `/topic/conversation/${id}/user/${userId}`;

    this.webSocketService.subscribe(channel, (message) => {
      const chatmessage: message = {content: message.body, id: 2147483646 , sender:0, conversation:id, isRead:false, createdAt:  
        this.datePipe.transform(new Date(), 'MMMM d, y HH:mm') ?? "Fecha no disponible"};

      const conversation = this.conversations.find(conversation => conversation.id === id);
      if (conversation) {
        if (conversation.user_1 !== this.authService.getUserInfo().id) {
          chatmessage.sender = conversation.user_1;
        } else if (conversation.user_2 !== this.authService.getUserInfo().id) {
          chatmessage.sender = conversation.user_2; 
        }
      }
      conversation.lastMessage = chatmessage;
      this.newMessageSubject.next(chatmessage);
      this.messageCache[id].messages.push(chatmessage)
    });
  }

  private isSubscribedToNewConversation = false;

  subscribeToNewConversation(): void {
      if (!this.isSubscribedToNewConversation) {
          this.isSubscribedToNewConversation = true;
  
          this.webSocketService.subscribe(
              `/user/${this.authService.getUserInfo().id}/queue/newConversation`,
              (message) => {
                  const newConversation = JSON.parse(message.body);
                  const exists = this.conversationsIds.has(newConversation.id);
                  this.newConversation.next(true);
                  
                  if (!exists) {
                      this.addCache(newConversation);
                      this.subscribeToConversation(newConversation.id);
                      this.conversations.push(newConversation);
                      this.conversationsSubject.next(this.conversations);
                  }
              }
          );
      }
  }

  sendNewConversation(recipientId: number): void {
    const newConversation = {
      senderId: this.authService.getUserInfo().id.toString(),
      recipientId: recipientId
    };

    this.webSocketService.sendMessage('/app/chat/newConversation', newConversation);
  }

  sendNewMessage(conversationId: number, content:string, recipientId: number): void {
    const newMessage = {
      userId: this.authService.getUserInfo().id,
      conversationId: conversationId,
      user1:this.authService.getUserInfo().id,
      user2:recipientId,
      content: content
    }

    this.webSocketService.sendMessage('/app/chat.sendMessage', newMessage);
  }
}
