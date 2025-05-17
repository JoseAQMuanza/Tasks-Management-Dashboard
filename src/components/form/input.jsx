const Input = ( {type, name, onChange, placeholder, className, value})  => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <input
        type={type}
        id={name}
        name={name}                
        onChange={onChange}
        className={className}
        placeholder={placeholder}
        value={value}
        
        required
      />
    </div>
  );
}

export default Input;