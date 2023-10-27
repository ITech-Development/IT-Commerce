import React from 'react'
import './filterMobile.css'

function FilterMobile({
    selectedCategories,
    handleCategoryDropdownChange,
    categories,
    selectedSortOption,
    handleSortOptionChange,
    minPrice,
    handleMinPriceChange,
    maxPrice,
    handleMaxPriceChange,
    closeFilter
}) {

    return (
        <div className='filterMobile'>
            <h2>Filter</h2>
            <hr />
            <div style={{ display: "grid", gap: "10px" }}>
                <div className="category-filter">
                    {/* Replace your category dropdown with the following */}
                    <label>Kategori:</label>
                    <select
                        value={selectedCategories}
                        onChange={handleCategoryDropdownChange}
                        className="filterDropdown"
                    >
                        <option value="">Semua</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {" "}
            <hr />
            <div className="price-filter">
                <label>Harga:</label>
                <input
                    type="number"
                    placeholder="Minimal"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    min={1}
                />
                <input
                    type="number"
                    placeholder="Maksimal"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    min={1}
                />
            </div>{" "}
            {/* <hr /> */}
            {/* <div className="stock-filter">
                <label>Stok:</label>
                <select value={selectedSortOption} onChange={handleSortOptionChange} className="filterDropdown">
                    <option value="">Semua</option>
                    <option value="stock">Tersedikit ke Terbanyak</option>
                    <option value="-stock">Terbanyak ke Tersedikit</option>
                </select>
            </div> */}
            <button className="close-sidebar" onClick={closeFilter}>
                <i className="fas fa-times"></i>
            </button>
        </div>
    )
}

export default FilterMobile