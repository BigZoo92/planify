import React, { useState } from "react";
import { Sliders } from "@phosphor-icons/react";
import "./Searchbar.scss";

interface SearchBarProps {
    onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            onSearch(searchTerm);
        }
    };

    return (
        <div className="search-wrapper">
            {/* <SearchBar onSearch={handleSearch} /> */}
            <div className="input-wrapper">
                <input type="text" placeholder="Rechercher..." />
            </div>
            <div className="filter-wrapper">
                <Sliders size={20} color="currentColor" />
            </div>
        </div>
    );
};

export default SearchBar;
