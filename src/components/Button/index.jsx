import s from './style.module.scss';

const Button = (props) => {
  const { text = 'Button', onClick = () => {} } = props;

  return (
  <div
  role="button"
  tabIndex={0}
  className={s.button}
  onClick={onClick}
  >
    {text}
  </div>
  );
}

export default Button;
