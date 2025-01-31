import EventEmitter from 'eventemitter3';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

import { GsiResponse } from './gsiStructure.ts';

export class GsiParser {
  emitter = new EventEmitter();
  connected = new BehaviorSubject<boolean>(false);

  private socket?: Socket;

  init() {
    this.socket = io('http://localhost:3000');

    this.socket.on('connect', () => {
      console.info('Connected to GsiParser');
      this.connected.next(true);
    });

    this.socket.on('disconnect', () => {
      this.connected.next(false);
    });

    this.socket.on('newdata', (json: string) => {
      const data: GsiResponse = JSON.parse(json);
      if (data.previously) {
        this.recursiveEmit('', data.previously, data);
      }

      if (data.added) {
        this.recursiveEmit('', data.added, data);
      }

      this.emitter.emit('newdata', data);
    });
  }

  dispose(): void {
    this.socket?.disconnect?.();
    this.emitter.removeAllListeners();
  }

  private recursiveEmit(prefix: string, changed: any, body: any) {
    Object.keys(changed).forEach((key) => {
      if (typeof changed[key] == 'object') {
        if (body[key] != null) {
          // safety check
          this.recursiveEmit(prefix + key + ':', changed[key], body[key]);
        }
      } else {
        // Got a key
        if (body[key] != null) {
          if (typeof body[key] == 'object') {
            // Edge case on added:item/ability:x where added shows true at the top level
            // and doesn't contain each of the child keys
            this.emitAll(prefix + key + ':', body[key]);
          } else {
            // For scanning keys and testing
            // emitter.emit("key", ""+prefix+key);
            // console.log("Emitting '"+prefix+key+"' - " + body[key]);
            this.emitter.emit(prefix + key, body[key]);
          }
        }
      }
    });
  }

  private emitAll(prefix: string, obj: any) {
    Object.keys(obj).forEach((key) => {
      // For scanning keys and testing
      // emitter.emit("key", ""+prefix+key);
      // console.log("Emitting '"+prefix+key+"' - " + obj[key]);

      this.emitter.emit(prefix + key, obj[key]);
    });
  }
}
