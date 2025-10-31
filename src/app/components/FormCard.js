"use client";
import React, { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  BookOpen,
  Plus,
  Trash2,
  CircleX,
} from "lucide-react";

const FormCard = ({
  category,
  data,
  onDataChange,
  onAddField,
  onDeleteField,
}) => {
  const [newFieldName, setNewFieldName] = useState("");
  const [showAddField, setShowAddField] = useState(false);

  let total = 0;
  let icon = <DollarSign className="w-4 h-4 text-gray-400" />;
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
  const keys = Object.keys(data);

  if (keys.length > 0) {
    total = Object.values(data).reduce(
      (sum, val) => sum + (parseFloat(val) || 0),
      0
    );
  }

  let totalValueClassName = "text-gray-700";
  if (
    category === "income" ||
    category === "investments" ||
    category === "balance"
  ) {
    totalValueClassName = "text-green-600";
    icon = <TrendingUp className="w-4 h-4 text-green-600" />;
  } else if (category === "expenses" || category === "bills") {
    totalValueClassName = "text-red-600";
    icon = <TrendingDown className="w-4 h-4 text-red-600" />;
  } else if (category === "savings") {
    totalValueClassName = "text-blue-600";
    icon = <BookOpen className="w-4 h-4 text-blue-600" />;
  }

  const handleAddField = () => {
    if (newFieldName.trim()) {
      onAddField(category, newFieldName.trim());
      setNewFieldName("");
      setShowAddField(false);
    }
  };

  return (
    <form className="p-6 rounded-2xl text-light bg-gray-800">
      {/* Header with Add Field Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-light flex items-center">
          {icon}
          <span className="ml-2">{categoryTitle}</span>
        </h2>
        <button
          type="button"
          onClick={() => setShowAddField(!showAddField)}
          className="cursor-pointer px-3 py-1 bg-primary text-white rounded hover:bg-accent transition-colors flex items-center gap-1 text-sm font-semibold"
        >
          <Plus className="w-3 h-3" />
          Add Field
        </button>
      </div>

      {/* Add New Field Input */}
      {showAddField && (
        <div className="mb-4 p-3 bg-slate-900 rounded-lg">
          <div className="flex gap-2">
            <input
              type="text"
              value={newFieldName}
              onChange={(e) => setNewFieldName(e.target.value)}
              placeholder="Enter field name"
              className="flex-1 px-3 py-2 border border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent text-slate-200 bg-slate-800 text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleAddField()}
            />
            <button
              type="button"
              onClick={handleAddField}
              className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
            >
              Add
            </button>
            <button
              type="button"
              className="p-2 text-red-500 hover:bg-red-900 rounded transition-colors  flex-shrink-0"
              onClick={() => setShowAddField(false)}
            >
              <CircleX className="w-4 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Total Display */}
      <div className="mb-4 p-3 bg-slate-900 rounded-lg">
        <p className="text-sm text-gray-500">Total {categoryTitle}</p>
        <p className={`text-2xl font-extrabold ${totalValueClassName}`}>
          ₹{total.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Fields List */}
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex items-center gap-3 group mb-3">
          <label className="capitalize text-slate-400 whitespace-normal break-words min-w-24 max-w-26">
            {key}
          </label>
          <input
            type="number"
            name={key}
            value={value}
            onChange={(e) => onDataChange(category, key, e.target.value)}
            className="flex-1 transition-all border border-slate-700 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent text-slate-200 min-w-0"
          />
          <button
            type="button"
            onClick={() => onDeleteField(category, key)}
            className="p-2 text-red-500 hover:bg-red-900 rounded transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
            title="Delete field"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      {/* Empty State */}
      {Object.keys(data).length === 0 && (
        <div className="text-center py-6 text-gray-500">
          <p>No fields yet.</p>
          <p className="text-sm mt-1">
            Click &quot;Add Field&ldquo; to get started
          </p>
        </div>
      )}
    </form>
  );
};

export default FormCard;
