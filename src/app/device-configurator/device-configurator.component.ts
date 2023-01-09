import {Component, Inject} from '@angular/core';
import {filterByChannel, MIDI_ACCESS, MIDI_MESSAGES, MIDI_SUPPORT, MidiChannel} from "@ng-web-apis/midi";
import {filter, Observable, tap} from "rxjs";
import {Clipboard} from "@angular/cdk/clipboard";
import MIDIAccess = WebMidi.MIDIAccess;
import {MatSelectChange} from "@angular/material/select";
import {MatCheckboxChange} from "@angular/material/checkbox";
import MIDIMessageEvent = WebMidi.MIDIMessageEvent;

@Component({
  selector: 'app-device-configurator',
  templateUrl: './device-configurator.component.html',
  styleUrls: ['./device-configurator.component.scss']
})
export class DeviceConfiguratorComponent {
  readonly appearance = 'outline';
  readonly copiedEvents: MIDIMessageEvent[] = [];
  readonly skippedEvents: MIDIMessageEvent[] = [];
  readonly unFilteredEvents: MIDIMessageEvent[] = [];
  readonly numberOfEventsToStore = 51;
  private midiAccess?: MIDIAccess;
  selectedChannel = 0;
  midiChannel = <MidiChannel[]>[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  selectedInputs?: string[];
  availableInputDevices?: WebMidi.MIDIInput[];
  copyToClipBoard = true;

  constructor(
    @Inject(MIDI_MESSAGES) messages$: Observable<any>,
    @Inject(MIDI_ACCESS) private midiAccessPromise: Promise<MIDIAccess>,
    @Inject(MIDI_SUPPORT) readonly midiSupported: boolean,
    private readonly clipboard: Clipboard
  ) {
    if (midiSupported) {
      messages$.pipe(
        tap(event => {
          if (this.unFilteredEvents.length < this.numberOfEventsToStore) {
            this.unFilteredEvents.unshift(event);
          } else {
            this.unFilteredEvents.pop();
          }
        }),
        filterByChannel(<MidiChannel>this.selectedChannel),
        filter(event => this.selectedInputs && this.selectedInputs?.length > 0 ? this.selectedInputs?.includes((event.target as any).id) : false)
      ).subscribe((event) => {
        if (event.data[0] === 144) {
          if (this.copyToClipBoard) {
            this.clipboard.copy(`${event.data[1]}_${event.data[2]}`);
            if (this.copiedEvents.length < this.numberOfEventsToStore) {
              this.copiedEvents.unshift(event);
            } else {
              this.copiedEvents.pop();
            }
          }
        } else {
          if (this.skippedEvents.length < this.numberOfEventsToStore) {
            this.skippedEvents.unshift(event);
          } else {
            this.skippedEvents.pop();
          }
        }
      });

      this.midiAccessPromise.then(midiAccess => {
        this.midiAccess = midiAccess;
        if (Array.from(midiAccess.inputs?.values()).length > 0) {
          this.availableInputDevices = Array.from(midiAccess.inputs?.values());
        }
        this.midiAccess.addEventListener('statechange', (e) => {
          if (this.selectedInputs?.includes(e.port.id)) {
            this.selectedInputs = this.selectedInputs?.filter(deviceId => deviceId !== e.port.id);
          }
          this.availableInputDevices = Array.from((e.currentTarget as MIDIAccess).inputs?.values());
        })
      })
    }
  }

  onChannelSelectionChange(event: MatSelectChange): void {
    this.selectedChannel = event.value;
  }

  onSelectedInputDevicesChange(event: MatSelectChange): void {
    this.selectedInputs = event.value;
  }

  onCopyToClipboardChange(event: MatCheckboxChange): void {
    this.copyToClipBoard = event.checked;
  }
}
