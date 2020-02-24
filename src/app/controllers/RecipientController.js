import Recipient from '../models/Recipient';

import { StoreSchema, UpdateSchema } from '../validations/Recipient';

class RecipientController {
  async store(req, res) {
    try {
      await StoreSchema.validate(req.body);

      const recipient = await Recipient.create(req.body);

      return res.json(recipient);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async update(req, res) {
    try {
      await UpdateSchema.validate(req.body);
      const { recipient_id } = req.params;

      const recipient = await Recipient.findByPk(recipient_id);

      if (!recipient) {
        return res.status(400).json({ error: 'Recipient not found!' });
      }

      await recipient.update(req.body);

      return res.json(recipient);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export default new RecipientController();
