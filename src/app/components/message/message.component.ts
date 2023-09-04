import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {JsonPipe, NgClass} from '@angular/common';
import {FirestoreDatePipe} from "../../pipes/firestore-date.pipe";
import {Message} from "../../interfaces/message.interface";

@Component({
  selector: 'app-msg',
  standalone: true,
  imports: [NgClass, FirestoreDatePipe, JsonPipe],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent {

  @Input() myMessage: boolean = false
  @Input({required: true}) sms!: Message

}
