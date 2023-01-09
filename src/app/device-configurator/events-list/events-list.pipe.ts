import { Pipe, PipeTransform } from '@angular/core';
import MIDIMessageEvent = WebMidi.MIDIMessageEvent;
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'simplifyMidiEvent'})
export class EventsListPipe implements PipeTransform {
  transform(value: MIDIMessageEvent[] | undefined): {deviceName: string, data: Uint8Array}[] | null {
    if (value) {
      return value.map(event => this.formatEventsList(event));
    } else {
      return null;
    }
  }

  private formatEventsList(event: MIDIMessageEvent): {deviceName: string, data: Uint8Array} {
    return {
      deviceName: (event.currentTarget as any)?.name,
      data: event.data
    }
  }
}
