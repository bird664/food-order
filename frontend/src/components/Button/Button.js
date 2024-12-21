import classes from './button.module.css'
export default function Button({
    type = 'button',
    text = 'Submit',
    onClick,
    color = 'white',
    backgroundColor = '#e72929',
    fontSize = '1.3rem',
    width = '12rem',
    height = '3.5rem',
    disabled = false,
  }) {
    return (
      <div className={classes.container}>
        <button
          style={{
            color,
            backgroundColor,
            fontSize,
            width,
            height,
          }}
          type={type}
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </button>
      </div>
    );
  }
  