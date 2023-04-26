import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

import STATUS from '../Utils/StatusCode';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const { model, year, color, status, buyValue, category, engineCapacity } = this.req.body;
    const motorcycle: IMotorcycle = {
      model, year, color, status, buyValue, category, engineCapacity,
    };

    try {
      const newMotorcycle = await this.service.create(motorcycle);
      return this.res.status(STATUS.CREATED).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    try {
      const motorcycleList = await this.service.getAll();
      return this.res.status(STATUS.OK).json(motorcycleList);
    } catch (error) {
      this.next(error);
    }
  }

  public async getById() {
    const { id } = this.req.params;
    try {
      const motorcycleFiltered = await this.service.getById(id);
      return this.res.status(STATUS.OK).json(motorcycleFiltered);
    } catch (error) {
      this.next(error);
    }
  }
}