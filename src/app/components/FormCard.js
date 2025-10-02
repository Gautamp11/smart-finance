"use client";
import React from "react";

const FormCard = ({ category, data, onDataChange }) => {
  return (
    <form className=" p-6 rounded-2xl text-light  bg-gray-800 ">
      <h2 className="text-xl font-semibold mb-4">{category.toUpperCase()}</h2>
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
