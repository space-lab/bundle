import './Select.css'

const Select = ({ options, value, onChange }) => {
  return (
    <div className='bundle-select-dropdown'>
      <select
        value={value}
        onChange={onChange}>
        {options.map(option =>
          <option key={option.id} value={option.id}>{option.name}</option>
        )}
      </select>
      <div className='down-arrow-icon'/>
    </div>
  )
}

Select.propTypes = {
  options: React.PropTypes.array.isRequired,
  value: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]).isRequired,
  onChange: React.PropTypes.func
}

export default Select
