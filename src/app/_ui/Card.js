const Card = ({ title, value, valueClassName, icon }) => (
  <div
    className={`bg-gray-200 p-4 rounded-xl shadow-sm border border-gray-100  transition-all hover:bg-gray-100 hover:scale-101 hover:shadow-gray-100`}
  >
    <div className="flex items-center justify-between mb-1">
      <h3 className="text-sm font-medium text-gray-500 flex items-center">
        {icon} <span className="ml-2">{title}</span>
      </h3>
    </div>
    <p className={`text-2xl font-bold ${valueClassName}`}>
      ₹{value?.toLocaleString("en-IN")}
    </p>
  </div>
);

export default Card;
