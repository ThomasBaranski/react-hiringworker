import React, { useState } from "react";
import { memo } from "react";
import DebounceInput from "react-debounce-input";
import "./styles.css";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onSearch, TooltipText = "" }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    onSearch(inputValue.toLowerCase());
  };
  const cleanSearch = () => {
    setQuery("");
    onSearch("");
  };
  return (
    <>
      <div className="searchbar_main">
        <DebounceInput
          //   type="search"
          //   minLength={2}
          debounceTimeout={300}
          element="input"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
        />

        {query && (
          <IconButton
            color="primary"
            className="clean_icon"
            onClick={cleanSearch}
          >
            <CloseIcon />
          </IconButton>
        )}
        {!query && <SearchIcon className="SearchIconmain" />}
        {TooltipText && <div className="Tooltip_main">{TooltipText}</div>}
      </div>
    </>
  );
};

export default memo(SearchBar);
