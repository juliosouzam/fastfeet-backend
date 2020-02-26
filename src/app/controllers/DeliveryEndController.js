import Order from '../models/Order';
import File from '../models/File';
import Recipient from '../models/Recipient';

class DeliveryEndController {
  async update(req, res) {
    const { courier_id, order_id } = req.params;
    const { signature_id } = req.body;

    const order = await Order.findByPk(order_id, {
      attributes: ['id', 'product', 'start_at', 'end_at', 'courier_id'],
      include: [
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
      ],
    });

    if (!order) {
      return res.status(400).json({ error: 'Order does not exists!' });
    }

    if (order.end_at) {
      return res.status(400).json({ error: 'Order already was ended!' });
    }

    if (order.courier_id !== Number(courier_id)) {
      return res
        .status(400)
        .json({ error: 'This order dont belongs to this courier' });
    }

    if (!order.start_at) {
      return res
        .status(400)
        .json({ error: 'This order dont was started yet!' });
    }

    await order.update({ signature_id, end_at: new Date() });

    return res.json(order);
  }
}

export default new DeliveryEndController();
