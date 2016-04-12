import {Streamer} from './streamer-model';
export class Cfg {
  constructor(
    public notificationsEnabled: boolean = true,
    public notificationSoundEnabled: boolean = true,
    public streams: Array<Streamer> = []
    ) { }
}
