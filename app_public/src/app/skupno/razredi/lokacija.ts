export class Lokacija {
    _id?: string;
    naziv?: string;
    naslov?: string;
    ocena?: number;
    cost?: number;
    razdalja?: number;
    number?: number;
    koordinate?: number[];
    komentarji?: Komentar[];
    WorkingHours?: WorkingHours[];
  }

export class Komentar {
    naziv?: string;
    ocena: number;
    cost?: number;
    komentar: string;
}

export class WorkingHours {
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
    Sunday: string;
}