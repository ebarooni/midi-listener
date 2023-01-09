import { Pipe, PipeTransform } from '@angular/core';
import MIDIMessageEvent = WebMidi.MIDIMessageEvent;

@Pipe({
  name: 'simplifyMidiEvent',
  pure: false
})
export class EventsListPipe implements PipeTransform {
  transform(value: MIDIMessageEvent[]): {deviceName: string, data: Uint8Array}[] {
    return value.map(event => ({
      deviceName: (event.currentTarget as any)?.name,
      data: event.data
    }));
  }

}
