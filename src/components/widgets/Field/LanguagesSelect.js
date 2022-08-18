import { useEffect } from 'react';
import MultiSelect from './MultiSelect';
import { inject, observer } from 'mobx-react';

const LanguagesSelect = inject('languages')(
  observer((props) => {
    useEffect(() => {
      props.languages.load();
    }, []);

    return (
      <MultiSelect
        loading={props.languages.loading}
        value={props.value}
        handleChange={(e) => props.handleChange(e)}
        options={props.languages.items.map((item) => ({
          value: item.id,
          label: item.name,
        }))}
      />
    );
  }),
);

export default LanguagesSelect;
