import {Component, Inject} from '@angular/core';
import {filterByChannel, MIDI_MESSAGES, MIDI_INPUT, MidiChannel} from "@ng-web-apis/midi";
import {filter, Observable, tap} from "rxjs";
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'midi-listener';
  myInput: any;
  myChannel = 0
  channels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

  constructor(@Inject(MIDI_MESSAGES) messages$: Observable<any>,
              private clipboard: Clipboard) {
    messages$.pipe(
      filterByChannel(<MidiChannel>this.myChannel),
    ).subscribe((event) => {
      if (event.data[0] === 144) {
        console.log(event)
        navigator.clipboard.writeText(`${event.data[1]}_${event.data[2]}`);
        this.clipboard.copy(`${event.data[1]}_${event.data[2]}`);
      }
    });
  }
}
