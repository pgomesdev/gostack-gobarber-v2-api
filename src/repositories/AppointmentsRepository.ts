import { isEqual } from 'date-fns';
import { Appointment } from '../models/Appointment';

export type CreateAppointmentDto = {
  provider: string;
  date: Date;
};

export class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public findAll(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    return (
      this.appointments.find(appointment => isEqual(date, appointment.date)) ||
      null
    );
  }

  public create({ provider, date }: CreateAppointmentDto): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}
