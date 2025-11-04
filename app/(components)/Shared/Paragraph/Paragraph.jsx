const Paragraph = ({ text, customStyle }) => {
  const cleanText = text?.replace(/rn/g, ""); // "rn" etiketlerini temizle
  return (
    <div
      className={customStyle}
      dangerouslySetInnerHTML={{ __html: `${cleanText}` }}
    />
  );
};

export default Paragraph;
