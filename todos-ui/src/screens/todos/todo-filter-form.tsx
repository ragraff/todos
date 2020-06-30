import React, { FC, useState, useEffect } from 'react';
import {
  createSetTodoFilterAction,
  createSetSortOptionsAction,
  getTodoFilter,
  getSortOptions,
} from '../../store';
import { TodoFilter } from '../../models/todo-filter';
import { SortOptions } from '../../models/sort';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import {
  Paper,
  createStyles,
  makeStyles,
  Select,
  MenuItem,
  Input,
  TextField,
  Button,
  Collapse,
} from '@material-ui/core';
import { ApplicationState } from '../../store/models/application-state';
import { ArrayHelpers } from '../../utilities/array-helpers';
import { Priority } from '../../models/priority';
import { DateTimePickerWrapper } from '../../common/date-time-picker-wrapper';
import { SortType } from '../../models/sort-type';
import { toTitleCase } from '../../utilities/string-helpers';
import { SortDirection } from '../../models/sort-direction';
import {
  defaultTodoFilter,
  defaultSortOptions,
} from '../../store/reducers/initial-state';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

interface TodoFilterFormProps {
  todoFilter: TodoFilter;
  sortOptions: SortOptions;
  setTodoFilter: (todoFilter: TodoFilter) => void;
  setSortOptions: (sortOptions: SortOptions) => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      padding: '10px',
      backgroundColor: '#938f94',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',

      '& button': {
        width: '25vw',
        alignSelf: 'center',
        marginBottom: '10px',
      },
    },
    filterForm: {
      paddingRight: '10px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flex: 1,
      '&>div': {
        marginBottom: '15px',
      },
    },
    sortForm: {
      flex: 1,
      paddingLeft: '10px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      '&>div': {
        marginBottom: '15px',
      },
    },
    prioritySelect: {},
  })
);

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

function getStyles(priority: string, _selectedPriorities: string[]) {
  return {
    fontWeight: _selectedPriorities.indexOf(priority) === -1 ? 100 : 500,
  };
}

const TodoFilterFormComponent: FC<TodoFilterFormProps> = ({
  todoFilter,
  sortOptions,
  setTodoFilter,
  setSortOptions,
}: TodoFilterFormProps) => {
  const initialFilterState = { ...todoFilter };
  const initialSortState = { ...sortOptions };
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedStartOfRange, setSelectedStartOfRange] = useState<Date | null>(
    null
  );
  const [selectedEndOfRange, setSelectedEndOfRange] = useState<Date | null>(
    null
  );
  const [isFilterDirty, setIsFilterDirty] = useState(false);
  const [isSortDirty, setIsSortDirty] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortOptions>({
    sortType: 'TITLE',
    sortDirection: 'ASC',
  });
  const [openFilter, setOpenFilter] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const {
      title: initialTitle,
      priorities: initialPriorities,
      startOfRange: initialStartOfRange,
      endOfRange: initialEndOfRange,
    } = initialFilterState;
    setIsFilterDirty(
      selectedTitle !== initialTitle ||
        !ArrayHelpers.equals(
          selectedPriorities as string[],
          initialPriorities as string[]
        ) ||
        selectedStartOfRange !== initialStartOfRange ||
        selectedEndOfRange !== initialEndOfRange
    );
  }, [
    selectedTitle,
    selectedPriorities,
    selectedStartOfRange,
    selectedEndOfRange,
    initialFilterState,
  ]);

  useEffect(() => {
    const {
      sortType: initialSortType,
      sortDirection: initialSortDirection,
    } = initialSortState;
    const {
      sortType: selectedSortType,
      sortDirection: selectedSortDirection,
    } = selectedSort;
    setIsSortDirty(
      selectedSortType !== initialSortType ||
        selectedSortDirection !== initialSortDirection
    );
  }, [selectedSort, initialSortState]);

  const getCurrentTodoFilter = (): TodoFilter => {
    return {
      ...initialFilterState,
      title: selectedTitle,
      priorities: selectedPriorities,
      startOfRange: selectedStartOfRange,
      endOfRange: selectedEndOfRange,
    };
  };

  const getCurrentSortOptions = (): SortOptions => {
    const { sortDirection, sortType } = selectedSort;
    return {
      ...initialSortState,
      sortDirection: sortDirection,
      sortType: sortType,
    };
  };

  const handleFilterClick = () => {
    setTodoFilter(getCurrentTodoFilter());
  };

  const handleFilterReset = () => {
    setSelectedTitle(defaultTodoFilter.title);
    setSelectedPriorities(defaultTodoFilter.priorities);
    setSelectedStartOfRange(defaultTodoFilter.startOfRange);
    setSelectedEndOfRange(defaultTodoFilter.endOfRange);

    setTodoFilter(defaultTodoFilter);
  };

  const handleSortReset = () => {
    setSelectedSort(defaultSortOptions);
    setSortOptions(defaultSortOptions);
  };

  const handleSortClick = () => {
    setSortOptions(getCurrentSortOptions());
  };

  const handleSortChange = (
    event: React.ChangeEvent<{ value: unknown; name?: string | undefined }>
  ) => {
    switch (event.target.name as string) {
      case 'sortType':
        setSelectedSort({
          ...selectedSort,
          sortType: event.target.value as string,
        });
        break;
      case 'sortDirection':
        setSelectedSort({
          ...selectedSort,
          sortDirection: event.target.value as string,
        });
        break;
    }
  };

  const handlePriorityChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedPriorities(event.target.value as string[]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTitle(event.target.value as string);
  };

  const handleStartOfRangeChange = (date: Date | null): void => {
    setSelectedStartOfRange(date);
  };

  const handleEndOfRangeChange = (date: Date | null): void => {
    setSelectedEndOfRange(date);
  };

  const handleOpenCollapseClick = () => {
    setOpenFilter(!openFilter);
  };

  return (
    <>
      <Button onClick={handleOpenCollapseClick}>
        {openFilter ? <RemoveCircleIcon /> : <AddCircleIcon />}
        &nbsp;&nbsp;Filters
      </Button>
      <Collapse in={openFilter}>
        <Paper variant="outlined" className={classes.paper}>
          <div className={classes.filterForm}>
            <h2>Filter</h2>
            <TextField
              required
              id="title-input"
              value={selectedTitle}
              onChange={handleTitleChange}
              placeholder={'Title'}
              variant="outlined"
            />
            <Select
              labelId="priority-filter-label"
              id="priority-filter"
              className={classes.prioritySelect}
              multiple
              value={selectedPriorities}
              onChange={handlePriorityChange}
              input={<Input />}
              MenuProps={MenuProps}
              variant="outlined"
            >
              {Object.keys(Priority).map(priority => (
                <MenuItem
                  key={priority}
                  value={priority}
                  style={getStyles(priority, selectedPriorities)}
                >
                  {toTitleCase(priority)}
                </MenuItem>
              ))}
            </Select>
            <DateTimePickerWrapper
              label="Start of range"
              selectedDate={selectedStartOfRange as Date}
              handleDateTimeChange={handleStartOfRangeChange}
            />
            <DateTimePickerWrapper
              label="End of range"
              selectedDate={selectedEndOfRange as Date}
              handleDateTimeChange={handleEndOfRangeChange}
            />
            <Button
              type="button"
              variant="outlined"
              disabled={!isFilterDirty}
              onClick={handleFilterClick}
            >
              Filter
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={handleFilterReset}
            >
              Reset
            </Button>
          </div>
          <div className={classes.sortForm}>
            <h2>Sort</h2>
            <Select
              labelId="sort-label"
              id="sort"
              value={selectedSort.sortType}
              onChange={handleSortChange}
              MenuProps={MenuProps}
              variant="outlined"
              name="sortType"
            >
              {Object.keys(SortType).map(sortType => (
                <MenuItem
                  key={sortType}
                  value={sortType}
                  style={getStyles(sortType, selectedPriorities)}
                >
                  {toTitleCase(sortType)}
                </MenuItem>
              ))}
            </Select>
            <Select
              labelId="sort-direction-label"
              id="sort-direction"
              value={selectedSort.sortDirection}
              onChange={handleSortChange}
              MenuProps={MenuProps}
              variant="outlined"
              name="sortDirection"
            >
              {Object.keys(SortDirection).map(sortDirection => (
                <MenuItem
                  key={sortDirection}
                  value={sortDirection}
                  style={getStyles(sortDirection, selectedPriorities)}
                >
                  {toTitleCase(sortDirection)}
                </MenuItem>
              ))}
            </Select>
            <Button
              type="submit"
              variant="outlined"
              disabled={!isSortDirty}
              onClick={handleSortClick}
            >
              Sort
            </Button>
            <Button type="button" variant="outlined" onClick={handleSortReset}>
              Reset
            </Button>
          </div>
        </Paper>
      </Collapse>
    </>
  );
};

const mapStateToProps = (state: ApplicationState) => {
  return {
    todoFilter: getTodoFilter(state),
    sortOptions: getSortOptions(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setTodoFilter: (todoFilter: TodoFilter) => {
      dispatch(createSetTodoFilterAction(todoFilter));
    },
    setSortOptions: (sortOptions: SortOptions) => {
      dispatch(createSetSortOptionsAction(sortOptions));
    },
  };
};

const TodoFilterForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoFilterFormComponent);

export default TodoFilterForm;
