import {Component, Inject} from '@angular/core';
import {filterByChannel, MIDI_ACCESS, MIDI_MESSAGES, MidiChannel} from "@ng-web-apis/midi";
import {filter, Observable} from "rxjs";
import { Clipboard } from '@angular/cdk/clipboard';
import MIDIAccess = WebMidi.MIDIAccess;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly year = new Date().getFullYear();
  title = 'midi-listener';
  myChannel = 0
  channels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  myInputs?: WebMidi.MIDIInput[];
  myInput?: string;

  constructor(
    @Inject(MIDI_MESSAGES) messages$: Observable<any>,
    @Inject(MIDI_ACCESS) private access: Promise<MIDIAccess>,
    private clipboard: Clipboard
  ) {
    messages$.pipe(
      filterByChannel(<MidiChannel>this.myChannel),
      filter(event => (event.target as any).id === this.myInput)
    ).subscribe((event) => {
      if (event.data[0] === 144) {
        console.log(event)
        this.clipboard.copy(`${event.data[1]}_${event.data[2]}`);
      }
    });

    this.access.then(access => {
      if (Array.from(access.inputs?.values()).length > 0) {
        this.myInputs = Array.from(access.inputs?.values());
        this.myInput = this.myInputs[0].id;
        console.log(this.myInputs)
      }
    })
  }
}
