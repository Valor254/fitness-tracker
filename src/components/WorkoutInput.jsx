const WorkoutInput = ({ label, name, type, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-500 rounded-md text-white bg-gray-800 focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default WorkoutInput;
