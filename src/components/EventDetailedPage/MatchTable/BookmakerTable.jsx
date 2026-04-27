import React from 'react';

/**
 * BookmakerTable Component
 * 
 * Renders the Bookmaker market table (0% Commission markets).
 */
const BookmakerTable = ({ bookmakerData, onBetClick }) => {
  return (
    <div className="market-section mb-4">
      <div className="market-section-title bg-[#243a48] text-white p-2 font-bold flex justify-between items-center text-sm">
        <span>BOOKMAKER MARKET</span>
        <span className="text-[10px] font-normal opacity-80 border-l border-white/20 pl-2 ml-2">0% Commission</span>
      </div>
      
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            <th className="text-left p-2 text-xs font-normal text-gray-500 w-[40%]">Market</th>
            <th colSpan="1" className="bg-[#72bbef] text-center text-xs font-bold py-1 w-20 border-r border-white">BACK</th>
            <th colSpan="1" className="bg-[#faa9ba] text-center text-xs font-bold py-1 w-20">LAY</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: 1, name: 'Surrey', b: 1.87, l: 1.89 },
            { id: 2, name: 'Essex', b: 2.12, l: 2.14 }
          ].map((runner) => (
            <tr key={runner.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="p-3">
                <div className="font-bold text-sm text-gray-800">{runner.name}</div>
                <div className="text-[10px] text-red-500 font-bold">0.00</div>
              </td>
              <td className="w-20 h-14 bg-[#72bbef] text-center cursor-pointer hover:opacity-80 transition-opacity border-r border-white">
                <span className="block font-bold text-lg leading-none">{runner.b}</span>
                <span className="text-[10px] opacity-70">10K</span>
              </td>
              <td className="w-20 h-14 bg-[#faa9ba] text-center cursor-pointer hover:opacity-80 transition-opacity">
                <span className="block font-bold text-lg leading-none">{runner.l}</span>
                <span className="text-[10px] opacity-70">12K</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookmakerTable;
