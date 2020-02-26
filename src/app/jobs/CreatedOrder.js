import Mail from '../../lib/Mail';

class CreatedOrder {
  get key() {
    return `CreatedOrder`;
  }

  async handle({ data }) {
    const { order } = data;

    await Mail.sendMail({
      to: `${order.courier.name} <${order.courier.email}>`,
      subject: 'Nova entrega disponível',
      template: 'created_order',
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

export default new CreatedOrder();
