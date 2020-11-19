import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import { AppointmentsRepository } from '../repositories/AppointmentsRepository';
import { CreateAppointmentService } from '../services/CreateAppointmentService';
import { Appointment } from '../models/Appointment';

/**
 * @info baseUrl: /appointments
 */

type ErrorMessage = {
  message: string;
};

const appointmentsRouter = Router();

appointmentsRouter.get(
  '/',
  async (req: Request, res: Response<Appointment[]>) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return res.json(appointments);
  },
);

appointmentsRouter.post(
  '/',
  async (req: Request, res: Response<Appointment | ErrorMessage>) => {
    try {
      const { providerId, date } = req.body;

      const parsedDate = parseISO(date);

      const createAppointmentService = new CreateAppointmentService();

      const appointment = await createAppointmentService.execute({
        providerId,
        date: parsedDate,
      });

      return res.json(appointment);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
);

export default appointmentsRouter;
