export class Appointment {
  id: number;

  provider: string;

  date: Date;

  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = Math.random() * 100;
    this.provider = provider;
    this.date = date;
  }
}
