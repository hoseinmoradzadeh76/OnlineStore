function CategoryFilter({ categoryFilter, setCategoryFilter }) {
  return (
    <div className="border rounded p-4 shadow-sm mb-6">
      <h3 className="text-lg border-b font-bold mb-4">Filters</h3>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="font-medium">
          Category
        </label>

        <select
          id="category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border px-3 py-2 rounded focus:outline-none focus:border-blue-400 cursor-pointer"
        >
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>
      </div>
    </div>
  );
}

export default CategoryFilter;
