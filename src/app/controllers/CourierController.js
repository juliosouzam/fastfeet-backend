import Courier from '../models/Courier';
import File from '../models/File';

import { StoreSchema, UpdateSchema } from '../validations/Courier';

class CourierController {
  async index(req, res) {
    const { page = 1, limit = 20 } = req.query;

    const couriers = await Courier.findAll({
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
      limit,
      offset: (page - 1) * limit,
      order: ['createdAt'],
    });

    return res.json(couriers);
  }

  async store(req, res) {
    try {
      await StoreSchema.validate(req.body);

      const { name, email, avatar_id } = req.body;

      const courier = await Courier.create({ name, email, avatar_id });

      return res.json(courier);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async show(req, res) {
    const courier = await Courier.findByPk(req.params.courier_id, {
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'name'],
        },
      ],
    });

    return res.json(courier);
  }

  async update(req, res) {
    try {
      await UpdateSchema.validate(req.body);

      const { name, email, avatar_id } = req.body;

      const courier = await Courier.findByPk(req.params.courier_id);

      if (email && email !== courier.email) {
        const eExists = await Courier.findOne({ where: { email } });

        if (eExists) {
          return res
            .status(400)
            .json({ error: 'Email its already being used' });
        }
      }

      courier.update({ name, email, avatar_id });

      return res.json(courier);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async destroy(req, res) {
    try {
      const courier = await Courier.findByPk(req.params.courier_id);

      await courier.destroy();

      return res.json();
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export default new CourierController();
