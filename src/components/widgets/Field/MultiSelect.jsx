import {
  Select,
  MenuItem,
  Chip,
  Input,
  FormControl,
  InputLabel,
  withStyles,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    width: '100%',
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiInput-underline.Mui-error:after': {
      borderBottomColor: 'red',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
  },
  selectItem: {
    '&.Mui-selected': {
      fontWeight: 'bold'
    }
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

export default function MultiSelect({ value, handleChange, options, loading }) {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-mutiple-chip-label">Languages</InputLabel>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Select
          style={{ width: '100%' }}
          multiple
          value={value}
          onChange={(e) => handleChange(e)}
          input={<Input className="formControl" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={options.find((item) => item.value === value)?.label}
                  className={classes.chip}
                />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem
              className={classes.selectItem}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  );
}
