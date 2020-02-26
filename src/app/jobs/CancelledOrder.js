import Mail from '../../lib/Mail';

class CancelledOrder {
  get key() {
    return `CancelledOrder`;
  }

  async handle({ data }) {
    const { order } = data;

    await Mail.sendMail({
      to: `${order.courier.name} <${order.courier.email}>`,
      subject: 'Ops, temos uma má notícia para você.',
      template: 'cancelled_order',
      context: {
        courier: order.courier.name,
        product: order.product,
        street: order.recipient.address_street,
        number: order.recipient.address_number,
        complement: order.recipient.address_complement,
        state: order.recipient.address_state,
        city: order.recipient.address_city,
        zipcode: order.recipient.address_zipcode,
      },
    });
  }
}

export default new CancelledOrder();
