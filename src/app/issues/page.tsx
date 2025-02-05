'use client';

import { useState } from 'react';

const SearchPage = () => {
  const [queries, setQueries] = useState([{ id: 1, input1: '', dropdown: '', input2: '' }]);
  const [issues] = useState([
    {
      date: '2025-02-05',
      key: 'ISSUE-001',
      summary: 'Fix login bug',
      priority: 'High',
      reporter: 'John Doe',
      status: 'In Progress',
    },
    {
      date: '2025-02-04',
      key: 'ISSUE-002',
      summary: 'Update search UI',
      priority: 'Medium',
      reporter: 'Jane Smith',
      status: 'Open',
    },
    {
      date: '2025-02-03',
      key: 'ISSUE-003',
      summary: 'Optimize database queries',
      priority: 'Critical',
      reporter: 'Alice Johnson',
      status: 'Resolved',
    },
  ]);

  const handleChange = (id: number, field: string, value: string) => {
    setQueries((prevQueries) =>
      prevQueries.map((query) => (query.id === id ? { ...query, [field]: value } : query))
    );
  };

  const addQuery = () => {
    setQueries((prevQueries) => [
      ...prevQueries,
      { id: Date.now(), input1: '', dropdown: '', input2: '' },
    ]);
  };

  const removeQuery = (id: number) => {
    setQueries((prevQueries) => prevQueries.filter((query) => query.id !== id));
  };

  const handleSearch = () => {
    console.log('Searching with queries:', queries);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Search</h1>
      <div className="w-full max-w-3xl space-y-4">
        {queries.map((query) => (
          <div key={query.id} className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow">
            <input
              type="text"
              placeholder="Input 1"
              value={query.input1}
              onChange={(e) => handleChange(query.id, 'input1', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={query.dropdown}
              onChange={(e) => handleChange(query.id, 'dropdown', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
            <input
              type="text"
              placeholder="Input 2"
              value={query.input2}
              onChange={(e) => handleChange(query.id, 'input2', e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => removeQuery(query.id)}
              className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <div className="flex space-x-4 mt-4">
        <button
          onClick={addQuery}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          + Add Query
        </button>
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* Issues Table */}
      <div className="w-full max-w-4xl mt-8 bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Issues</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Key</th>
                <th className="px-4 py-2 border">Summary</th>
                <th className="px-4 py-2 border">Priority</th>
                <th className="px-4 py-2 border">Reporter</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue, index) => (
                <tr key={index} className="text-center border-b">
                  <td className="px-4 py-2 border">{issue.date}</td>
                  <td className="px-4 py-2 border">{issue.key}</td>
                  <td className="px-4 py-2 border">{issue.summary}</td>
                  <td className="px-4 py-2 border">{issue.priority}</td>
                  <td className="px-4 py-2 border">{issue.reporter}</td>
                  <td className="px-4 py-2 border">{issue.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
