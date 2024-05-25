import "./Searchbar.scss";

const Searchbar: React.FC = ({}) => {
    return (
        <div className="search-wrapper">
            <div className="input-wrapper">
                <input type="text" placeholder="Rechercher..." />
            </div>
            {/* <div className="filter-wrapper">
                <Sliders size={20} color="currentColor" />
            </div> */}
        </div>
    );
};

export default Searchbar;
