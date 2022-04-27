import APIClient from 'api/clients/base';
import { buildUrl } from 'utils/api';

const paths = {
  ORDERS: 'orders',
};

class OrderAPIClient {
  constructor() {
    this.client = new APIClient();
  }

  getOrders() {
    return this.client.get(buildUrl(paths.ORDERS));
  }

  createOrder(requestBody) {
    return this.client.post(buildUrl(paths.ORDERS), requestBody);
  }
}

export default new OrderAPIClient();
