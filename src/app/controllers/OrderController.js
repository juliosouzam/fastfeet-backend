import Order from '../models/Order';
import Recipient from '../models/Recipient';
import File from '../models/File';
import Courier from '../models/Courier';

import { StoreSchema, UpdateSchema } from '../validations/Order';

class OrderController {
  async index(req, res) {
    const { page = 1, limit = 20 } = req.query;

    const orders = await Order.findAll({
      where: {
        canceled_at: null,
      },
      attributes: ['product'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'address_street',
            'address_number',
            'address_complement',
            'address_state',
            'address_city',
            'address_zipcode',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['path', 'url'],
        },
        {
          model: Courier,
          as: 'courier',
          attributes: ['name', 'email'],
        },
      ],
      order: ['createdAt'],
      limit,
      offset: (page - 1) * limit,
    });

    return res.json(orders);
  }

  async store(req, res) {
    try {
      await StoreSchema.validate(req.body);

      const { recipient_id, courier_id, product } = req.body;

      const order = await Order.create({ recipient_id, courier_id, product });

      return res.json(order);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async show(req, res) {
    const order = await Order.findByPk(req.params.order_id);

    return res.json(order);
  }

  async update(req, res) {
    try {
      await UpdateSchema.validate(req.body);

      const { recipient_id, courier_id, product } = req.body;

      const order = await Order.findByPk(req.params.order_id);

      if (order.start_at || order.canceled_at) {
        return res.status(400).json({
          error:
            'Orders that have already left for delivery or have already been canceled cannot be changed',
        });
      }

      await order.update({ recipient_id, courier_id, product });

      return res.json(order);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async destroy(req, res) {
    const order = await Order.findByPk(req.params.order_id);

    await order.update({ canceled_at: new Date() });

    return res.json();
  }
}

export default new OrderController();
