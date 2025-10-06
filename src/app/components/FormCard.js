"use client";
import React from "react";
import {
  List,
  ChevronLeft,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BookOpen,
} from "lucide-react";

const FormCard = ({ category, data, onDataChange }) => {
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

  return (
    <form className=" p-6 rounded-2xl text-light  bg-gray-800 ">
      <h2 className="text-xl font-bold text-light mb-4 flex items-center">
        {icon}
        <span className="ml-2">{categoryTitle}</span>
      </h2>
      <div className="mb-4 p-3 bg-slate-900 rounded-lg">
        <p className="text-sm text-gray-500">Total {categoryTitle}</p>
        <p className={`text-2xl font-extrabold ${totalValueClassName}`}>
          ₹{total.toLocaleString("en-IN")}
        </p>
      </div>

      <br />
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex items-center gap-2 mb-3">
          <label className="flex-1 capitalize text-lg text-slate-400">
            {category === "bills" ? `${key} Card` : key}
          </label>
          <input
            type="number"
            name={key}
            value={value}
            onChange={(e) => onDataChange(category, key, e.target.value)}
            // className="bg-gray-400 text-dark shadow p-2 flex-1 rounded-lg font-semibold "
            className=" transition-all border border-slate-700 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent text-slate-200"
          />
        </div>
      ))}
    </form>
  );
};

export default FormCard;
