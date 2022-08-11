import { Component } from 'react';
import MultiSelect from './MultiSelect';
import { inject, observer } from 'mobx-react';

@inject('languages')
@observer
export default class LanguagesSelect extends Component {
  componentDidMount() {
    this.props.languages.load();
  }
  render() {
    return (
      <MultiSelect
        loading={this.props.languages.loading}
        value={this.props.value}
        handleChange={(e) => this.props.handleChange(e)}
        options={this.props.languages.items.map((item) => ({
          value: item.id,
          label: item.name,
        }))}
      />
    );
  }
}
