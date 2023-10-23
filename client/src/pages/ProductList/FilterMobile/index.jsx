import React from 'react'

function FilterMobile({ 
    selectedCategories, 
    handleCategoryDropdownChange, 
    categories, 
    selectedSortOption, 
    handleSortOptionChange }) {
    return (
        <div style={{ width: "280px", paddingTop: "30px" }} className="filterMobile">
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
                <select value={selectedSortOption} onChange={handleSortOptionChange} className="filterDropdown">
                    <option value="">Semua</option>
                    <option value="price">Minimum</option>
                    <option value="-price">Maksimum</option>
                </select>
            </div>{" "}
            <hr />
            <div className="stock-filter">
                <label>Stok:</label>
                <select value={selectedSortOption} onChange={handleSortOptionChange} className="filterDropdown">
                    <option value="">Semua</option>
                    <option value="stock">Minimum</option>
                    <option value="-stock">Maksimum</option>
                </select>
            </div>
        </div>
    )
}

export default FilterMobile