import {Component, inject, OnInit, signal} from '@angular/core';
import {NgClass, NgFor} from '@angular/common';
import {ChatService} from "../../services/chat.service";
import {User} from "../../interfaces/user.interface";
import {FormsModule} from "@angular/forms";
import {toSignal} from "@angular/core/rxjs-interop";
import {FirestoreDatePipe} from "../../pipes/firestore-date.pipe";
import {MessageComponent} from "../../components/message/message.component";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    NgClass, NgFor,
    FormsModule, FirestoreDatePipe,
    MessageComponent
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private chatService: ChatService = inject(ChatService);

  messages = toSignal(this.chatService.getChatMessages()) // signal<Message[]>([]);
  currentUser = signal<string>(this.chatService.getUserUidCurrent());
  users = toSignal(this.chatService.getUsers(), {
    initialValue: []
  });
  inputMessage = signal<string>('')

  ngOnInit() {
  }

  initMessages() {
    this.chatService.getChatMessages().subscribe(console.log)
  }

  async sendMessage() {
    for (let user of this.users()) {
      if (user.uid !== this.currentUser())
        await this.chatService.addChatMessageFromTo(this.inputMessage(), user.uid)
    }
    this.inputMessage.set('');
  }

  clearMessages() {
  }

  outLogin() {
  }
}
