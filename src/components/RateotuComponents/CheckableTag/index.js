import React from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';
import styles from './style.module.scss';

const { CheckableTag } = Tag;

class CustomCheckableTag extends React.Component {
  state = {
    checked: true,
  };

  handleChange = (checked) => {
    const { onChange, name } = this.props;
    this.setState({ checked });
    onChange(checked, name.toLowerCase());
  };

  render() {
    const { checked } = this.state;
    const { name } = this.props;

    return (
      <CheckableTag
        className={
          // eslint-disable-next-line no-nested-ternary
          checked
            ? name === 'FOOD'
              ? styles.checkableTagFood
              : styles.checkableTagDrink
            : styles.checkableTag
        }
        checked={this.state.checked}
        onChange={this.handleChange}
      >
        {name}
      </CheckableTag>
    );
  }
}

CustomCheckableTag.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

CustomCheckableTag.defaultProps = {
  onChange: () => {},
};

export default CustomCheckableTag;
