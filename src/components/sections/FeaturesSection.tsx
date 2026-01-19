import IntegrationCard from '../ui/IntegrationCard';

const DeepSeekIcon = () => (
  <svg width="55" height="55" viewBox="0 0 55 55" fill="none">
    <path 
      d="M27.5 14.7L41.025 35.575H13.975L27.5 14.7Z" 
      fill="#F2F2F2"
      stroke="#F2F2F2"
      strokeWidth="1.6"
    />
  </svg>
);

const ChatGPTIcon = () => (
  <svg width="53" height="54" viewBox="0 0 53 54" fill="none">
    <path 
      d="M26.5 0C29.5 0 32.5 2.5 32.5 6V15C32.5 18.5 29.5 21 26.5 21C23.5 21 20.5 18.5 20.5 15V6C20.5 2.5 23.5 0 26.5 0ZM45 26.5C48.5 26.5 51 29.5 51 32.5C51 35.5 48.5 38.5 45 38.5H36C32.5 38.5 29.5 35.5 29.5 32.5C29.5 29.5 32.5 26.5 36 26.5H45ZM26.5 33C29.5 33 32.5 35.5 32.5 39V48C32.5 51.5 29.5 54 26.5 54C23.5 54 20.5 51.5 20.5 48V39C20.5 35.5 23.5 33 26.5 33ZM8 26.5C11.5 26.5 14.5 29.5 14.5 32.5C14.5 35.5 11.5 38.5 8 38.5H-1C-4.5 38.5 -7.5 35.5 -7.5 32.5C-7.5 29.5 -4.5 26.5 -1 26.5H8Z" 
      fill="#F2F2F2"
    />
  </svg>
);

export default function FeaturesSection() {
  return (
    <section className="w-full bg-bg-base py-[60px] md:py-[80px]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-[80px] md:mb-[120px]">
          <div className="max-w-[320px]">
            <p className="text-text-muted font-sans text-lg md:text-[22px] font-normal leading-[1.2] md:leading-[25.78px] mb-5">
              Some copy here
            </p>
            <h2 className="text-text-primary text-2xl md:text-[28px] font-normal leading-[1.25] md:leading-[35px]">
              Raking{' '}
              <span className="font-bold italic">Brand Visibility</span>
            </h2>
          </div>
        </div>

        {/* Integration Cards */}
        <div className="flex flex-wrap gap-6 md:gap-8 justify-center md:justify-start">
          <IntegrationCard 
            icon={<DeepSeekIcon />}
            name="DeepSeek"
          />
          <IntegrationCard 
            icon={<ChatGPTIcon />}
            name="ChatGPT"
          />
        </div>
      </div>
    </section>
  );
}