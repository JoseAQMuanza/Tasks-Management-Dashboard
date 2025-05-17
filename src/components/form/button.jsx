const Button = ({ text, onClick, color }) => {
  return <button onClick={onClick} className={`${color} hover:underline mr-2 cursor-pointer`}> {text} </button>  
}

export default Button;