const Select = ({ name, options, className, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <select
        id={name}
        name={name}        
        onChange={onChange}
        className={className}        
      >
        {
          options.length > 0 ? (
            options.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))
          ): <option value="Emptied">Emptied</option>
        }                        
      </select>
    </div>
  )
}

export default Select;