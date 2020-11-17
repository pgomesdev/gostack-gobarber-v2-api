import { startOfHour } from 'date-fns';
import { Appointment } from '../models/Appointment';
import { AppointmentsRepository } from '../repositories/AppointmentsRepository';

type CreateAppointmentDto = {
  provider: string;
  date: Date;
};

export class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: CreateAppointmentDto): Appointment {
    const appointmentDate = startOfHour(date);
    const findAppointmentAtSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentAtSameDate) {
      throw Error('This appointment is already booked');
    }
    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}
