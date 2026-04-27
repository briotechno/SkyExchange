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
const ScoreboardRender = ({ html }) => {
  // If no HTML is provided, we show a subtle loading state instead of nothing


  return (
    <section
      className="bg-[#1a1a1a] bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] text-white p-0 relative border-b-4 border-[#ffb80c] shadow-lg min-h-[140px] w-full transition-all duration-300"
      style={{ backgroundColor: '#1a1a1a', }} // Fallback if Tailwind is failing
    >
      {/* Decorative gradient overlay to match premium feel */}
      <div className="absolute inset-0 bg-[#ffb80c]/5 pointer-events-none" />

      {html && html.length > 0 && (
        <div
          className="w-full relative z-10 [&_iframe]:w-full [&_iframe]:min-h-[140px] [&_iframe]:border-none [&_div]:!w-full [&_table]:w-full [&_table]:text-white"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
      <div
        className='flex items-center justify-center p-2'
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '8px', width: '100%' }}
      >
        <div className="sr-lmt-plus__footer-wrapper">
          <div
            className="sr-lmt-plus__expand-wrapper srm-is-collapsed cursor-pointer"
            style={{ cursor: 'pointer' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 12 12"
              className="w-4 h-4 text-primary"
              style={{ width: '16px', height: '16px', fill: '#ffb80c', cursor: 'pointer' }}
            >
              <path
                d="M12 3.5c0-.1-.05-.2-.12-.28l-.6-.6c-.07-.07-.18-.12-.28-.12s-.2.05-.27.12L6 7.35 1.27 2.62A.42.42 0 0 0 1 2.5a.4.4 0 0 0-.28.12l-.6.6A.4.4 0 0 0 0 3.5c0 .1.05.2.12.27l5.6 5.61c.08.07.19.12.28.12s.2-.05.28-.12l5.6-5.6A.43.43 0 0 0 12 3.5z">
              </path>
            </svg>
          </div>
        </div>
      </div>
      {/* If the HTML is too short or doesn't contain a div, it might just be a style block or empty data */}
      {html && html.length < 100 && !html.includes('<div') && (
        <div className="absolute inset-0 flex items-center justify-center text-white/40 text-[10px] uppercase font-bold">
          Connecting to Score Server...
        </div>
      )}
    </section>
  );
};

export default ScoreboardRender;
