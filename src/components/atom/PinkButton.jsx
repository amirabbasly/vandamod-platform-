"use client";

const PinkButton = ({ text, action, bgcolor = "#E90089", width }) => {
  const buttonWidth =
    typeof width === "number" ? `${width}px` : width || "auto";

  return (
    <button
      type="button"
      style={{
        backgroundColor: bgcolor,
        width: buttonWidth,
      }}
      className="text-white px-4 py-2 rounded cursor-pointer"
      onClick={action}
    >
      {text}
    </button>
  );
};

export default PinkButton;
