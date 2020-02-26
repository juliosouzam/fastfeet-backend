import Order from '../models/Order';
import DeliveryProblem from '../models/DeliveryProblem';

class ProblemController {
  async store(req, res) {
    const { order_id } = req.params;
    const { description } = req.body;

    const order = await Order.findByPk(order_id);

    if (!order) {
      return res.status(400).json({ error: 'Order does not exists' });
    }

    const problem = await DeliveryProblem.create({ order_id, description });

    return res.json(problem);
  }
}

export default new ProblemController();
