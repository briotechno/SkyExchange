import React from 'react';

/**
 * ScoreboardRender Component
 * 
 * Renders raw HTML scoreboard data provided by the API using Tailwind CSS.
 * This is used across different sports to display real-time scores.
 * 
 * @param {Object} props
 * @param {string} props.html - The raw HTML string to be rendered.
 */
const ScoreboardRender = ({ html, tvVisible, tvHtml, tvLoading, toggleTv }) => {
  return (
    <section
      className="bg-[#1a1a1a] bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] text-white p-0 relative border-b-4 border-[#ffb80c] shadow-lg w-full transition-all duration-300"
      style={{ backgroundColor: '#1a1a1a' }}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-[#ffb80c]/5 pointer-events-none" />

      {/* Main Scoreboard area */}
      {html && html.length > 0 && (
        <div
          className="w-full relative z-10 [&_iframe]:w-full [&_iframe]:min-h-[140px] [&_iframe]:border-none [&_div]:!w-full [&_table]:w-full [&_table]:text-white"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}

      {/* Expanded TV / Detail area */}
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${tvVisible ? 'max-h-[500px] border-t border-white/10' : 'max-h-0'}`}
      >
        {tvLoading ? (
          <div className="flex flex-col items-center justify-center py-10 bg-black/40">
            <div className="w-8 h-8 border-4 border-[#ffb80c]/20 border-t-[#ffb80c] rounded-full animate-spin mb-2" />
            <span className="text-[10px] uppercase font-bold text-[#ffb80c]">Loading Stream...</span>
          </div>
        ) : tvHtml ? (
          <div className="w-full aspect-video bg-black relative">
            <iframe
              srcDoc={tvHtml}
              className="w-full h-full border-0"
              allowFullScreen
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          </div>
        ) : null}
      </div>

      {/* Expand/Collapse Control */}
      <div
        className='flex items-center justify-center p-1 bg-[#1a1a1a]'
        style={{ width: '100%' }}
      >
        <div 
          className="cursor-pointer hover:bg-white/5 rounded-full p-1 transition-all"
          onClick={toggleTv}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 12"
            className={`w-4 h-4 transition-transform duration-300 ${tvVisible ? 'rotate-180' : ''}`}
            style={{ width: '16px', height: '16px', fill: '#ffb80c' }}
          >
            <path
              d="M12 3.5c0-.1-.05-.2-.12-.28l-.6-.6c-.07-.07-.18-.12-.28-.12s-.2.05-.27.12L6 7.35 1.27 2.62A.42.42 0 0 0 1 2.5a.4.4 0 0 0-.28.12l-.6.6A.4.4 0 0 0 0 3.5c0 .1.05.2.12.27l5.6 5.61c.08.07.19.12.28.12s.2-.05.28-.12l5.6-5.6A.43.43 0 0 0 12 3.5z">
            </path>
          </svg>
        </div>
      </div>

      {/* Fallback for score server connection */}
      {html && html.length < 100 && !html.includes('<div') && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/40 text-[10px] uppercase font-bold">
          Connecting...
        </div>
      )}
    </section>
  );
};

export default ScoreboardRender;
