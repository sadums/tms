'use client';

import { useState, useRef, useEffect } from 'react';

interface Query {
  dropdown1: string;
  dropdown2: string;
  selectedItems: number[];
}

interface Item {
  id: number;
  name: string;
}

const itemsData: Item[] = [
  { id: 1, name: 'Option A' },
  { id: 2, name: 'Option B' },
  { id: 3, name: 'Option C' },
  { id: 4, name: 'Option D' },
];

const SearchPage = () => {
  const [queries, setQueries] = useState<Query[]>([
    { dropdown1: '', dropdown2: '', selectedItems: [] },
  ]);
  const [items, setItems] = useState<Item[]>(itemsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setFocusedIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddQuery = () => {
    setQueries([...queries, { dropdown1: '', dropdown2: '', selectedItems: [] }]);
  };

  const handleDeleteQuery = (index: number) => {
    if (queries.length > 1) {
      setQueries(queries.filter((_, i) => i !== index));
    }
  };

  const handleChange = (index: number, field: keyof Query, value: string | number[]) => {
    const newQueries = [...queries];
    newQueries[index][field] = value as never;
    setQueries(newQueries);
  };

  const handleItemCheck = (index: number, itemId: number) => {
    setQueries((prevQueries) => {
      const newQueries = [...prevQueries];
      const selectedItems = new Set(newQueries[index].selectedItems);

      if (selectedItems.has(itemId)) {
        selectedItems.delete(itemId);
      } else {
        selectedItems.add(itemId);
      }
      newQueries[index].selectedItems = Array.from(selectedItems);
      return newQueries;
    });
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Search Page</h1>
      {queries.map((query, index) => (
        <div key={index} className="flex items-center gap-4 mb-4 p-4 border rounded-lg">
          {/* Dropdown 1 */}
          <select
            value={query.dropdown1}
            onChange={(e) => handleChange(index, 'dropdown1', e.target.value)}
            className="border p-2 flex-1"
          >
            <option value="">Select Option 1</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>

          {/* Dropdown 2 */}
          <select
            value={query.dropdown2}
            onChange={(e) => handleChange(index, 'dropdown2', e.target.value)}
            className="border p-2 flex-1"
          >
            <option value="">Select Option 2</option>
            <option value="optionA">Option A</option>
            <option value="optionB">Option B</option>
          </select>

          {/* Searchable List Input */}
          <div
            ref={containerRef}
            className="relative flex-1 border p-2 rounded cursor-pointer"
            onClick={() => setFocusedIndex(index)}
          >
            <div className="flex flex-wrap gap-1">
              {query.selectedItems.length > 0
                ? query.selectedItems.map((id) => {
                    const item = items.find((item) => item.id === id);
                    return (
                      <span key={id} className="bg-gray-200 px-2 py-1 rounded text-sm">
                        {item?.name}
                      </span>
                    );
                  })
                : 'Select Items...'}
            </div>

            {/* Dropdown */}
            {focusedIndex === index && (
              <div
                className="absolute left-0 top-full mt-1 w-full bg-white border rounded shadow-lg z-10"
                onClick={(e) => e.stopPropagation()} // Prevent closing when interacting with the dropdown
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border-b"
                  autoFocus
                />
                <ul className="max-h-40 overflow-y-auto">
                  {filteredItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation(); // Ensure dropdown stays open
                        handleItemCheck(index, item.id); // Toggle selection
                      }}
                    >
                      <span>{item.name}</span>
                      <input
                        type="checkbox"
                        checked={query.selectedItems.includes(item.id)}
                        className="w-5 h-5"
                        readOnly
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Delete Query Button */}
          {queries.length > 1 && (
            <button
              onClick={() => handleDeleteQuery(index)}
              className="text-red-500"
            >
              Delete
            </button>
          )}
        </div>
      ))}

      {/* Add Query Button */}
      <button onClick={handleAddQuery} className="bg-blue-500 text-white p-2 rounded mb-4">
        Add Query
      </button>

      {/* Search Button */}
      <button className="bg-green-500 text-white p-2 rounded">
        Search
      </button>
    </div>
  );
};

export default SearchPage;
