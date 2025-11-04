const SharedButton = ({
  customStyle,
  text,
  ngClass = "",
  handleAddToCard,
  disabled,
}) => {
  return (
    <button
      className={`${customStyle} flex items-center  gap-[12px]`}
      onClick={handleAddToCard}
    >
      <h3 className="w-max">{text}</h3>
      {disabled ? (
        <></>
      ) : (
        <img
          className={`${ngClass} w-[10px] h-[10px]`}
          src="/right.svg"
          alt="right"
        />
      )}
    </button>
  );
};

export default SharedButton;
