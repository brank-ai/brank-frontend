import Image from 'next/image';

const llmPlatforms = [
  { name: 'ChatGPT', logo: '/images/LLMs/chatgpt.svg' },
  { name: 'Claude', logo: '/images/LLMs/claude.svg' },
  { name: 'Deepseek', logo: '/images/LLMs/deepseek.svg' },
  { name: 'Gemini', logo: '/images/LLMs/gemini.svg' },
  { name: 'Grok', logo: '/images/LLMs/grok.svg' },
  { name: 'Perplexity', logo: '/images/LLMs/perplexity.svg' },
];

export default function AIExposureSection() {
  return (
    <section className="w-full bg-bg-base py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main headline */}
        <h2 className="text-text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-3 sm:mb-4 text-center">
          Brank helps you understand your{' '}
          <span className="text-text-primary italic">AI exposure.</span>
        </h2>
        
        {/* Subtitle */}
        <p className="text-text-muted text-sm sm:text-base md:text-lg mb-10 sm:mb-12 md:mb-16 text-center">
          Across ChatGPT, Claude, Deepseek, Gemini, Grok, and Perplexity.
        </p>
        
        {/* Platform Logos */}
        <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4 max-w-6xl mx-auto">
          {llmPlatforms.map((platform) => (
            <div 
              key={platform.name}
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 border border-subtle flex items-center justify-center"
            >
              <Image
                src={platform.logo}
                alt={`${platform.name} logo`}
                width={24}
                height={24}
                className="object-contain sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}