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
    <section className="w-full bg-black py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main headline */}
        <h2 className="text-white text-4xl md:text-5xl font-light leading-tight mb-4 text-center">
          Brank helps you understand your{' '}
          <span className="bg-gradient-to-r from-[#00FFBB] to-[#00B7FF] bg-clip-text text-transparent italic">AI exposure.</span>
        </h2>
        
        {/* Subtitle */}
        <p className="text-gray-400 text-lg mb-16 text-center">
          Across ChatGPT, Claude, Deepseek, Gemini, Grok, and Perplexity.
        </p>
        
        {/* Platform Logos */}
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {llmPlatforms.map((platform) => (
            <div 
              key={platform.name}
              className="w-24 h-24 border border-gray-700 flex items-center justify-center"
            >
              <Image
                src={platform.logo}
                alt={`${platform.name} logo`}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}