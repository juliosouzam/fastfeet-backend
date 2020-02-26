import {
  setHours,
  isBefore,
  isAfter,
  setMinutes,
  setSeconds,
  startOfDay,
  endOfDay,
  getHours,
  format,
} from 'date-fns';
import { Op } from 'sequelize';
import Order from '../models/Order';
import schedules from '../util/schedule';

class DeliveryStartController {
  async update(req, res) {
    const { courier_id, order_id } = req.params;

    const availables = schedules.map(time => {
      const [hour] = time.split(':');
      const value = setSeconds(setMinutes(setHours(new Date(), hour), 0), 0);
      const now = setSeconds(
        setMinutes(setHours(new Date(), getHours(new Date())), 0),
        0
      );

      return (
        format(now, "yyyy-MM-dd'T'HH:mm:ssxxx") ===
        format(value, "yyyy-MM-dd'T'HH:mm:ssxxx")
      );
    });

    if (!availables.find(a => a === true)) {
      return res
        .status(400)
        .json({ error: 'You can only withdraw a order between 8am and 06pm' });
    }

    const countAll = await Order.findAndCountAll({
      where: {
        courier_id,
        canceled_at: null,
        start_at: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())],
        },
      },
    });

    if (countAll.count >= 5) {
      return res
        .status(400)
        .json({ error: 'You can only has 5 withdraw per day' });
    }

    const order = await Order.findByPk(order_id);

    await order.update({ start_at: new Date() });

    return res.json(order);
  }
}

export default new DeliveryStartController();
