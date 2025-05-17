const TextArea = ({ name, value, onChange, className, placeholder, rows }) => {  
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className={className}
        placeholder={placeholder}
        required
      ></textarea>
    </div>
  );
}

export default TextArea;