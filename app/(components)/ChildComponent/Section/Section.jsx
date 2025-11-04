const Section = ({ ngClass = "", children }) => {
  return <section className={`${ngClass}`}>{children}</section>;
};

export default Section;
