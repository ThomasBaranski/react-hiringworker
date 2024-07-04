import { Box, IconButton } from "@mui/material";
import React, { memo } from "react";
// import CloseIcon from "@mui/icons-material/Close";
import Select from "react-select";
import styled from "@emotion/styled";

const SelectMain = styled(Box)({
  "& .css-1fdsijx-ValueContainer": {
    marginTop: "-16px",
  },
  "& .has_react_select__value-container": {
    marginTop: "-15px !important",
    svg: {
      color: "#fff",
      "&:hover": {
        color: "#fff",
      },
    },
  },
  "& .has_react_select__indicators ": {
    marginTop: "-16px",
    svg: {
      color: "#fff",
      "&:hover": {
        color: "#fff",
      },
    },
  },
  "& .react_select__value-container": {
    marginTop: "-16px",
  },
  "& .react_select__indicator ": {
    svg: {
      color: "#fff",
      "&:hover": {
        color: "#fff",
      },
    },
  },
  "& .css-1hb7zxy-IndicatorsContainer": {
    marginTop: "-12px",
    svg: {
      color: "#fff",
      "&:hover": {
        color: "#fff",
      },
    },
  },
  "& .react_select__indicators ": {
    marginTop: "-12px",
    svg: {
      color: "#fff",
      "&:hover": {
        color: "#fff",
      },
    },
  },
  "& .has_react_select__dropdown-indicator": {
    display: "none",
  },
});

const CustomSelect = styled(Select)`
  width: 100%;
  margin-top: 8px;
`;
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "1px solid #9277f7",
    boxShadow: "none",
    height: "42px",
    borderRadius: "8px",
    padding: "10px",
    backgroundColor: state.isFocused ? "#9277f7" : "#9277f7",
    "&:hover": {
      border: "1px solid #9277f7",
    },
    color: "#fff",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#fff",
    cursor: "pointer",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#fff",
    border: "1px solid #9277f7",
  }),
  // dropdownIndicator: () => ({
  //   display: "none",
  // }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#9277f7" : "#9277f7",
    backgroundColor: "#fff",
    cursor: "pointer",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#9277f7",
    },
  }),
};

const FilterDropdown = ({
  setFilterOptions = () => {},
  FilterOption = "",
  FilterOptions = [],
}) => {
  const handleChange = (selectedOption) => {
    setFilterOptions(selectedOption?.value || "");
  };

  const options = FilterOptions.map((value) => ({
    value: value.value,
    label: value.label,
    isDisabled: value.value === "",
  }));

  return (
    <>
      <SelectMain sx={{ minWidth: 200 }}>
        <CustomSelect
          value={options.find((opt) => opt.value === FilterOption)}
          onChange={handleChange}
          options={options}
          styles={customStyles}
          isSearchable={false}
          isClearable={FilterOption === "" ? false : true}
          classNamePrefix={` ${
            FilterOption === "" ? "react_select" : "has_react_select"
          }`}
        />
      </SelectMain>
    </>
  );
};

export default memo(FilterDropdown);
