const Input = ({ text, padding, type = "text" }) => (
  <input
    type={type}
    placeholder={text}
    style={{
      padding: padding,
      color: "black",
      border: "none",
      outline: "none",
      textAlign: "right",
      direction: "rtl",
    }}

  />
);
export default Input;
