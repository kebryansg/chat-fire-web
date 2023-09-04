import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../interfaces/user.interface";
import {Message} from "../interfaces/message.interface";
import {addDoc, collection, collectionData, Firestore, orderBy, query, serverTimestamp,} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  firestore: Firestore = inject(Firestore);

  getUsers(): Observable<User[]> {
    const aCollection = collection(this.firestore, 'users');
    return collectionData(aCollection, {idField: 'uid'}) as unknown as Observable<User[]>;
  }

  getChatMessages(): Observable<Message[]> {
    const aCollection = collection(this.firestore, 'messages');
    const q = query(aCollection, orderBy('createdAt'))
    return collectionData(q, {idField: 'id'}) as unknown as Observable<Message[]>;
  }

  getUserUidCurrent() {
    return localStorage.getItem('user') ?? '';
  }

  async addMessageChat(msg: string) {
    const messageBody = {
      msg: msg,
      from: this.getUserUidCurrent(),
      createdAt: serverTimestamp()//Date.now()
    }

    const toRef = collection(this.firestore, `messages`)

    await addDoc(toRef, messageBody);

  }

  async addChatMessageFromTo(msg: string, to: string) {
    console.log("Log Message To: ", to)
    const messageBody = {
      msg: msg,
      from: this.getUserUidCurrent(),
      createdAt: serverTimestamp()//Date.now()
    }
    const toRef = collection(this.firestore, `messages/${to}/${this.getUserUidCurrent()}`)
    const fromRef = collection(this.firestore, `messages/${this.getUserUidCurrent()}/${to}`)

    await addDoc(toRef, messageBody);
    await addDoc(fromRef, messageBody);

  }


}
