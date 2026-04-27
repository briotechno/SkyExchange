import React from 'react';

/**
 * FancyTable Component
 * 
 * Renders the Fancy (Session) markets table.
 */
const FancyTable = ({ fancyData, onBetClick }) => {
  return (
    <div className="market-section mb-4">
      <div className="market-section-title bg-[#243a48] text-white p-2 font-bold flex justify-between items-center text-sm">
        <span>FANCY MARKET</span>
      </div>
      
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            <th className="text-left p-2 text-xs font-normal text-gray-500 w-[60%]">Market</th>
            <th className="bg-[#faa9ba] text-center text-xs font-bold py-1 w-24 border-r border-white">NO (LAY)</th>
            <th className="bg-[#72bbef] text-center text-xs font-bold py-1 w-24">YES (BACK)</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: 1, name: '6 Over Run Surrey', no: 42, yes: 44, no_rate: 100, yes_rate: 100 },
            { id: 2, name: 'Essex 1st Over Run', no: 6, yes: 8, no_rate: 110, yes_rate: 110 },
            { id: 3, name: 'Fall of 1st Wicket Surrey', no: 24, yes: 26, no_rate: 100, yes_rate: 100 }
          ].map((market) => (
            <tr key={market.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="p-3">
                <div className="font-bold text-sm text-gray-800">{market.name}</div>
                <div className="text-[10px] text-gray-400 mt-1">Min: 100 | Max: 50,000</div>
              </td>
              <td className="bg-[#fde4ea] text-center cursor-pointer hover:opacity-80 transition-opacity border-r border-white">
                <span className="block font-bold text-base leading-none">{market.no}</span>
                <span className="text-[10px] opacity-70">{market.no_rate}</span>
              </td>
              <td className="bg-[#e2f2fe] text-center cursor-pointer hover:opacity-80 transition-opacity">
                <span className="block font-bold text-base leading-none">{market.yes}</span>
                <span className="text-[10px] opacity-70">{market.yes_rate}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FancyTable;
