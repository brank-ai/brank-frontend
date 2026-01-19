interface IntegrationCardProps {
  icon: React.ReactNode;
  name: string;
}

export default function IntegrationCard({ icon, name }: IntegrationCardProps) {
  return (
    <div
      className="
        w-[150px] md:w-[172px]
        h-[150px] md:h-[172px]
        rounded-2xl md:rounded-3xl
        flex flex-col items-center justify-center
        gap-3 md:gap-4
        shadow-soft-tile-sm
        hover:shadow-soft-tile
        transition-all duration-300
      "
    >
      <div className="w-[45px] md:w-[55px] h-[45px] md:h-[55px] flex items-center justify-center text-text-muted">
        {icon}
      </div>
      <span className="text-text-primary font-medium text-lg md:text-xl leading-tight text-center tracking-tight">
        {name}
      </span>
    </div>
  );
}
