// Sidebar.jsx
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const FilterSortSidebar = ({ isOpen, onClose, handleCheckboxChange, sort, setSort, filter, setFilter, setSearch }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Sidebar */}
                    <motion.div
                        className="fixed right-0 top-0 h-full w-80 bg-white z-50 shadow-lg p-6 flex flex-col"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Sort & Filter</h2>
                            <button onClick={onClose}>
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Sort */}
                        <div className="mb-6">
                            <h3 className="font-medium text-gray-700 mb-2">Sort By</h3>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2">
                                    <input
                                        onChange={(e) => setSort(e.target.value)}
                                        checked={sort === 'latest'}
                                        type="radio" name="sort" value="latest" className="accent-blue-600" />
                                    <span>Latest</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        onChange={(e) => setSort(e.target.value)}
                                        checked={sort === 'price_low'}
                                        type="radio" name="sort" value="price_low" className="accent-blue-600" />
                                    <span>Price: Low to High</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        onChange={(e) => setSort(e.target.value)}
                                        checked={sort === 'price_high'}
                                        type="radio" name="sort" value="price_high" className="accent-blue-600" />
                                    <span>Price: High to Low</span>
                                </label>
                            </div>
                        </div>

                        {/* Filter */}
                        <div>
                            <h3 className="font-medium text-gray-700 mb-2">Filter By Category</h3>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={filter.includes("Luxury")}
                                        className="accent-green-600"
                                        value="Luxury"
                                        onChange={handleCheckboxChange}
                                    />
                                    <span>Luxury</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={filter.includes("Smartwatches")}
                                        className="accent-green-600"
                                        value="Smartwatches"
                                        onChange={handleCheckboxChange}
                                    />
                                    <span>Smartwatches</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={filter.includes("Sports")}
                                        className="accent-green-600"
                                        value="Sports"
                                        onChange={handleCheckboxChange}
                                    />
                                    <span>Sports</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={filter.includes("Casual")}
                                        className="accent-green-600"
                                        value="Casual"
                                        onChange={handleCheckboxChange}
                                    />
                                    <span>Casual</span>
                                </label>
                            </div>
                        </div>

                        {/* clear button */}
                        <div className="flex justify-center my-5">
                            <button onClick={() => [
                                setSort(''),
                                setFilter([]),
                                setSearch('')
                            ]}
                                className="bg-orange-400 text-white px-4 py-2 rounded-lg font-semibold"
                            >
                                Clear All
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default FilterSortSidebar;
