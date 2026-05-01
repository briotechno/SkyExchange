import React from 'react';

const OddsBox = ({ price, size, type, isSuspended }) => {
  const bgColor = type === 'back' ? 'bg-[#72bbef]' : 'bg-[#faa9ba]';
  return (
    <div className={`flex-1 flex flex-col items-center justify-center h-[36px] cursor-pointer border-r border-white last:border-0 ${bgColor} ${isSuspended ? 'opacity-50 grayscale' : ''}`}>
      <span className="text-[12px] font-bold text-black leading-none">{price || '-'}</span>
      <span className="text-[9px] text-[#333] leading-none mt-0.5">{size || ''}</span>
    </div>
  );
};

const MultiMarketTable = ({ 
  sportName, 
  matchName, 
  marketName, 
  runners, 
  rateData, 
  onToggleFav, 
  onHeaderClick 
}) => {
  
  const isMarketSuspended = rateData?.status === 'SUSPENDED' || rateData?.suspended === 'Y' || rateData?.active === 'No';

  return (
    <div className="bg-white border border-[#9aa9b5] overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-[#2c3f4d] text-white px-3 py-2 flex justify-between items-center cursor-pointer" onClick={onHeaderClick}>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-[#ffb400] uppercase tracking-wider">{sportName}</span>
          <span className="text-[13px] font-black uppercase">{matchName}</span>
          <span className="text-[10px] text-gray-300 font-bold uppercase">{marketName}</span>
        </div>
        <div className="flex items-center gap-4">
           <button 
             onClick={(e) => { e.stopPropagation(); onToggleFav(); }}
             className="text-yellow-400 hover:text-yellow-500"
           >
             <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
             </svg>
           </button>
        </div>
      </div>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#e3e3e3] border-b border-[#9aa9b5]">
            <th className="text-left px-3 py-1.5 text-[11px] font-black text-[#444] uppercase w-[60%]">Runner</th>
            <th className="px-3 py-1.5 text-[11px] font-black text-[#444] uppercase w-[20%] text-center bg-[#72bbef]/30">Back</th>
            <th className="px-3 py-1.5 text-[11px] font-black text-[#444] uppercase w-[20%] text-center bg-[#faa9ba]/30">Lay</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {runners.map((runner, idx) => {
            const isRunnerSuspended = runner.status === 'SUSPENDED' || runner.selectionStatus === 'SUSPENDED';
            const isSuspended = isMarketSuspended || isRunnerSuspended;

            // Extract best back/lay
            const backPrices = runner.back || runner.availableToBack || runner.ex?.availableToBack || [];
            const layPrices = runner.lay || runner.availableToLay || runner.ex?.availableToLay || [];
            
            const bestBack = backPrices[0] || {};
            const bestLay = layPrices[0] || {};

            return (
              <tr key={runner.SelectionId || idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-3 py-3">
                  <span className="text-[13px] font-bold text-[#0077cc] uppercase">{runner.RunnerName || runner.name}</span>
                </td>
                <td className="p-0 relative">
                   <div className="flex border border-gray-300 mx-1 my-1 rounded overflow-hidden">
                      <OddsBox 
                        price={bestBack.price || bestBack.rate} 
                        size={bestBack.size} 
                        type="back" 
                        isSuspended={isSuspended}
                      />
                   </div>
                </td>
                <td className="p-0 relative">
                   <div className="flex border border-gray-300 mx-1 my-1 rounded overflow-hidden">
                      <OddsBox 
                        price={bestLay.price || bestLay.rate} 
                        size={bestLay.size} 
                        type="lay" 
                        isSuspended={isSuspended}
                      />
                   </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MultiMarketTable;
