import APIClient from 'api/clients/base';
import { buildUrl } from 'utils/api';

const paths = {
  TABLES: 'tables',
  TABLE_SEAT_SWITCH: 'tables/:table_id/seats/:id/switch-seat',
};

class TableAPIClient {
  constructor() {
    this.client = new APIClient();
  }

  getTables() {
    return this.client.get(buildUrl(paths.TABLES));
  }

  switchTableSeat(pathParams, requestBody) {
    return this.client.patch(buildUrl(paths.TABLE_SEAT_SWITCH, { pathParams }), requestBody);
  }
}

export default new TableAPIClient();
