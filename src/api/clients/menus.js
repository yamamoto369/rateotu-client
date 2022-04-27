import APIClient from 'api/clients/base';
import { buildUrl } from 'utils/api';

const paths = {
  MENUS: 'menus',
};

class MenuAPIClient {
  constructor() {
    this.client = new APIClient();
  }

  getMenus() {
    return this.client.get(buildUrl(paths.MENUS));
  }

}

export default new MenuAPIClient();
