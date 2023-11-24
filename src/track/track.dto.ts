export class TrackDto {
    readonly id: string;
    readonly nombre: string;
    readonly duracion: number;
    readonly albumId: string; // ID del álbum al que se asociará el track
}
