"use client";

const PinkButton = ({ text, action, bgcolor = "#E90089" }) => {
  return (
    <button
      type="button"
      style={{
        backgroundColor : bgcolor,
      }}
      className={"text-white px-4 py-2 rounded"}
      onClick={action}
    >
      {text}
    </button>
  );
};

export default PinkButton;