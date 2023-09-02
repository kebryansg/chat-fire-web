import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';
import {formatDate} from "@angular/common";
import {Timestamp} from "@angular/fire/firestore";

@Pipe({
  name: 'firestoreDate',
  standalone: true
})
export class FirestoreDatePipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale: string) {
  }

  transform(timestamp: Timestamp, format?: string): string {
    if (!timestamp) {
      return '';
    }
    // 'yyyy/MM/dd hh:MM:ss'
    return formatDate(timestamp.toDate(), format || 'short', this.locale);
  }

}
