import React from 'react';

const SearchFilterForm = ({
  canBuy = false,
  handleCanBuy,
  handleGenre,
  handleType,
  onClickCancel = () => {},
  onClickSave = () => {},
  parameters = {}
}) => (
  <div>
    <form id="search-filter__form" className="p-4" onSubmit={onClickSave}>

      <div className="pt-4 pb-3 text-center">
        <div className="text-center border-bottom">
          <h4 className="mb-3">Search Filters</h4>
        </div>
        <small className="">(search filters are still partially under development)</small>
      </div>

      <div className="search-filter_section">
        <div className="search-filter_section__a">
          <div id="search-filter__canBuy" className="search-filter-form__checkbox">
            <input id="canBuy" type="checkbox" name="canBuy" />{/* checked={canBuy} onChange={handleCanBuy} */}
            <label className="">
              Search in stock
            </label>
          </div>

          <div id="search-filter__author" className="search-filter-form__checkbox">
            <input id="author" type="checkbox" name="author" className="search-filter-form__checkbox" />
            <label>
              Search by author
            </label>
          </div>

          <div id="search-filter__title" className="search-filter-form__checkbox">
            <input id="title" type="checkbox" name="title" />
            <label>
              Search by title
            </label>
          </div>
        </div>

        <div className="search-filter_section__b">
          <div id="search-filter__type" className="search-filter-form__dropdown">
            <label>
              Search ebooks and downloads
            </label>
            <select id="type" name={'type'} selected={parameters.type} onChange={handleType}>
              <option value={0}></option>
              <option value={'ebooks'}>ebooks</option>
              <option value={'free-ebooks'}>free ebooks</option>
              <option value={'paid-ebooks'}>paid ebooks</option>
              {/* <option value={'print-books'}>print books only</option> */}
              <option value={'full'}>fully available online</option>
              <option value={'partial'}>partially available online</option>
            </select>
          </div>
          
          <div id="search-filter__genre" className="search-filter-form__dropdown pt-2">
            <label>
              Search by genre
            </label>
            <select id="genre" name="genre" selected={parameters.genre} onChange={handleGenre}>
              <option value={0}></option>
              {/* <option disabled value={'fiction'}>fiction</option>
              <option disabled value={'nonfiction'}>nonfiction</option>
              <option disabled value={'other'}>other</option> */}
            </select>
          </div>
        </div>
      </div>

      <div id="search-filter_form__actions">
        <div>
          <button className="btn btn-outline-danger" onClick={onClickCancel}>
            cancel
          </button>
        </div>

        <div className="pl-2">
          <button className="btn btn-outline-primary" onClick={onClickSave}>
            apply
          </button>
        </div>
      </div>
    </form>
  </div>
);

export default SearchFilterForm;
