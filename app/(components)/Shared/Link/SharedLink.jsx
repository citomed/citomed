import Link from "next/link";

const SharedLink = ({
  href,
  text,
  customStyle,
  customImgClass = "",
  h2Class = "",
  src = "/right.svg",
}) => {
  return (
    <Link
      href={`${href}`}
      target="_blank"
      download={`${href}`}
      className={`${customStyle}`}
    >
      <h3 className={`w-max capitalize ${h2Class}`}>{text}</h3>
      <img src={src} alt="right" className={customImgClass} />
    </Link>
  );
};

export default SharedLink;
