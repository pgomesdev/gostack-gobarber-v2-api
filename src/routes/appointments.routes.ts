import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { AppointmentsRepository } from '../repositories/AppointmentsRepository';
import { CreateAppointmentService } from '../services/CreateAppointmentService';
import { Appointment } from '../models/Appointment';

/**
 * @info baseUrl: /appointments
 */

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();
const createAppointmentService = new CreateAppointmentService(
  appointmentsRepository,
);

appointmentsRouter.get('/', (req: Request, res: Response<Appointment[]>) => {
  const appointments = appointmentsRepository.findAll();

  return res.json(appointments);
});

appointmentsRouter.post('/', (req: Request, res: Response) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);

    const appointment = createAppointmentService.execute({
      provider,
      date: parsedDate,
    });

    return res.json(appointment);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default appointmentsRouter;
