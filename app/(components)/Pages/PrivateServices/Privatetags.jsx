const Privatetags = ({ data }) => {
  const service_tags = data
    .map((item, index) => {
      const cleaned = item
        .replace(/^\[?\{?"?value"?[:]?/, "")
        .replace(/["}\]\[]+/g, "")
        .trim();

      return {
        id: index + 1,
        text: cleaned,
      };
    })
    .filter((tag) => tag.text !== "");

  return (
    <>
      <ul className="grid grid-cols-12 gap-[24px] mt-[40px] md:mt-[20px]">
        {service_tags?.map((item, i) => (
          <li
            key={i}
            className="col-span-3 flex items-center xl:col-span-4 lg:col-span-6 md:col-span-12 p-[16px] md:p-[16px] border border-[--color-blue] rounded-[10px] text-[--color-blue] text-[16px] 1xl:text-[16px] md:text-[13px]"
          >
            <div dangerouslySetInnerHTML={{ __html: `${item?.text}` }} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Privatetags;
