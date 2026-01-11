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
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Main headline */}
        <h2 className="text-white text-4xl md:text-5xl font-light leading-tight mb-4">
          Brank helps you understand your{' '}
          <span className="bg-gradient-to-r from-[#00FFBB] to-[#00B7FF] bg-clip-text text-transparent italic">AI exposure.</span>
        </h2>
        
        {/* Subtitle */}
        <p className="text-gray-400 text-lg mb-16">
          Across ChatGPT, Claude, Deepseek, Gemini, Grok, and Perplexity.
        </p>
        
        {/* Platform Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {llmPlatforms.map((platform) => (
            <div key={platform.name} className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center p-3">
                <Image
                  src={platform.logo}
                  alt={`${platform.name} logo`}
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-gray-400 text-sm">{platform.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}