import Image from "next/image";

const EventDetail = ({ icon, value }: { icon: string; value: string }) => {
  return (
    <p className="flex-row-gap-2 items-center">
      <Image src={icon} alt={value} width={14} height={14} />
      <span>{value}</span>
    </p>
  );
};

export default EventDetail;
