import Order from '../models/Order';
import DeliveryProblem from '../models/DeliveryProblem';
import File from '../models/File';
import Courier from '../models/Courier';
import Recipient from '../models/Recipient';

class DeliveryProblemController {
  async index(req, res) {
    const problems = await Order.findAll({
      attributes: [
        'id',
        'product',
        'canceled_at',
        'start_at',
        'end_at',
        'signature_id',
        'courier_id',
        'recipient_id',
      ],
      include: [
        {
          model: DeliveryProblem,
          as: 'problems',
          required: true,
          attributes: ['id', 'description'],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['path', 'url'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
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
          model: Courier,
          as: 'courier',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.json(problems);
  }

  async show(req, res) {
    const { order_id } = req.params;

    const problem = await Order.findByPk(order_id, {
      attributes: [
        'id',
        'product',
        'canceled_at',
        'start_at',
        'end_at',
        'signature_id',
        'courier_id',
        'recipient_id',
      ],
      include: [
        {
          model: DeliveryProblem,
          as: 'problems',
          required: true,
          attributes: ['id', 'description'],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['path', 'url'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
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
          model: Courier,
          as: 'courier',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.json(problem);
  }
}

export default new DeliveryProblemController();
