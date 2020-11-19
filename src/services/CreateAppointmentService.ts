import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import { Appointment } from '../models/Appointment';
import { AppointmentsRepository } from '../repositories/AppointmentsRepository';

type CreateAppointmentDto = {
  providerId: string;
  date: Date;
};

export class CreateAppointmentService {
  public async execute({
    providerId,
    date,
  }: CreateAppointmentDto): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);
    const findAppointmentAtSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentAtSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id: providerId,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}
