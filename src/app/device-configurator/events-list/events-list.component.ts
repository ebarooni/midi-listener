import {Component, Input, OnInit} from '@angular/core';
import MIDIMessageEvent = WebMidi.MIDIMessageEvent;
import {Clipboard} from "@angular/cdk/clipboard";

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  @Input() listName?: string;
  @Input() eventsList?: MIDIMessageEvent[];

  constructor(private readonly clipboard: Clipboard) { }

  ngOnInit(): void {
  }

  formatEventsList(event: MIDIMessageEvent): {deviceName: string, data: Uint8Array} {
    return {
      deviceName: (event.currentTarget as any)?.name,
      data: event.data
    }
  }

  manuallyCopyEventToClipBoard(data: Uint8Array): void {
    this.clipboard.copy(`${data[1]}_${data[2]}`);
  }

}
