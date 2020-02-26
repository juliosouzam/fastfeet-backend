import Order from '../models/Order';

class DeliveryController {
  async index(req, res) {
    const { courier_id } = req.params;

    const orders = await Order.findAll({
      where: {
        courier_id,
        canceled_at: null,
        start_at: null,
      },
    });

    return res.json(orders);
  }
}

export default new DeliveryController();
