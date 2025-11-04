

const Main = ({ customClass = "", children }) => {
  return <main className={`mt-72 1xl:mt-60 xl:mt-44 lg:mt-32 relative z-[100] ${customClass}`}>{children}</main>;
}; 

export default Main;
