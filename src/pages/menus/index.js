import React from 'react';
import { Empty } from 'antd';
import MenuItemCard from 'components/RateotuComponents/MenuItemCard';
import CheckableTag from 'components/RateotuComponents/CheckableTag';
import Loader from 'components/LayoutComponents/Loader';
import camelcaseKeys from 'camelcase-keys';
import MenuAPIClient from 'api/clients/menus';

class MenuList extends React.Component {
  state = {
    isLoading: true,
    menuItemsInit: {},
    menuItems: {},
    selectedCategories: ['food', 'drink'],
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    MenuAPIClient.getMenus().then((response) => {
      this.setState({
        isLoading: false,
        // Take items only from first menu,
        // to reduce time needed to Design a List UI
        menuItemsInit: camelcaseKeys(response.data[0].items),
        menuItems: camelcaseKeys(response.data[0].items),
      });
    });
  };

  // Simple frontend filtering (as shortcut)
  // should be done over REST API with query params
  filterMenuItems = (checked, category) => {
    const { menuItemsInit, selectedCategories } = this.state;

    if (checked) {
      const selected = [...selectedCategories, category];
      this.setState({
        menuItems: menuItemsInit.filter((i) => selected.includes(i.category.name)),
        selectedCategories: selected,
      });
    } else {
      const selected = selectedCategories.filter((c) => c !== category);
      this.setState({
        menuItems: menuItemsInit.filter((i) => selected.includes(i.category.name)),
        selectedCategories: selected,
      });
    }
  };

  render() {
    const { isLoading, menuItems } = this.state;

    if (isLoading) {
      return <Loader />;
    }

    return (
      <>
        <div className="mb-4">
          <CheckableTag
            name="FOOD"
            onChange={this.filterMenuItems}
          />
          <CheckableTag
            name="DRINK"
            onChange={this.filterMenuItems}
          />
        </div>
        <div className="productsCatalog">
          <div className="row">
            {menuItems.length ? (
              menuItems.map((item) => (
                <div className="col-xl-3 col-lg-4 col-md-12 mb-3" key={item.id}>
                  <MenuItemCard item={item} />
                </div>
              ))
            ) : (
              <Empty className="d-flex mx-auto" />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default MenuList;
