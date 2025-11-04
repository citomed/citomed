const FlexCenter = ({ children, customClass }) => {
  return (
    <div className={`flex items-center justify-center ${customClass}`}>
      {children}
    </div>
  );
};

export default FlexCenter;
