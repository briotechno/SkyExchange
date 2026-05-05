import React, { useState, useEffect } from 'react';
import { useBettingStore } from '../store/bettingStore';
import { useAuthStore } from '../store/authStore';
import { userController } from '../controllers/user/userController';
import { useSnackbarStore } from '../store/snackbarStore';

const EditStakeModal = ({ isOpen, onClose }) => {
  const { stakes, setStakes } = useBettingStore();
  const { loginToken } = useAuthStore();
  const { show: showSnackbar } = useSnackbarStore();
  const [localStakes, setLocalStakes] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchStakes = async () => {
      if (!isOpen || !loginToken) {
        if (isOpen) setLocalStakes([...stakes]);
        return;
      }

      setIsFetching(true);
      try {
        const response = await userController.getStakeButtons(loginToken);
        if (response && typeof response === 'object' && !response.error) {
          const fetchedStakes = [];
          for (let i = 1; i <= 6; i++) {
            const item = response[i.toString()] || response[i];
            if (item) {
              fetchedStakes.push({
                label: item.Btnname || item.btnname || `S${i}`,
                value: item.Btnval || item.btnval || '0'
              });
            }
          }
          if (fetchedStakes.length > 0) {
            setLocalStakes(fetchedStakes);
            setStakes(fetchedStakes);
          } else {
            setLocalStakes([...stakes]);
          }
        } else {
          setLocalStakes([...stakes]);
        }
      } catch (err) {
        console.error('Failed to fetch stakes:', err);
        setLocalStakes([...stakes]);
      } finally {
        setIsFetching(false);
      }
    };

    fetchStakes();
  }, [isOpen, loginToken]);

  if (!isOpen) return null;

  const handleInputChange = (index, field, value) => {
    const updated = [...localStakes];
    updated[index] = { ...updated[index], [field]: value };
    setLocalStakes(updated);
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const payload = {};
      localStakes.forEach((s, i) => {
        payload[`Label${i + 1}`] = s.label || `S${i + 1}`;
        payload[`Stake${i + 1}`] = s.value;
      });

      if (loginToken) {
        const res = await userController.editStake(loginToken, payload);
        if (res && (res.status === 'Success' || res.error === '0')) {
          setStakes(localStakes);
          showSnackbar('Stake values updated successfully!', 'success');
          onClose();
        } else {
          showSnackbar(res?.msg || 'Failed to update stake values on server', 'error');
        }
      } else {
        setStakes(localStakes);
        onClose();
      }
    } catch (err) {
      console.error(err);
      showSnackbar('Error updating stake values', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-[450px] overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Edit Stake</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl font-light"
          >
            &times;
          </button>
        </div>

        <div className="p-5 relative min-h-[300px]">
          {isFetching && (
            <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Loading...</span>
              </div>
            </div>
          )}

          {/* Sub Header */}
          <div className="bg-[#2a2a2a] text-white px-3 py-2 rounded-t-sm font-bold text-sm uppercase tracking-wide mb-4">
            Change Button Values
          </div>

          {/* Grid Header */}
          <div className="grid grid-cols-2 gap-4 mb-2 px-1">
            <span className="text-sm font-bold text-gray-700">Price Label</span>
            <span className="text-sm font-bold text-gray-700">Price Value</span>
          </div>

          {/* Inputs Scroll Area */}
          <div className="max-height-[400px] overflow-y-auto pr-1 flex flex-col gap-3">
            {localStakes.map((stake, idx) => (
              <div key={idx} className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  value={stake.label}
                  onChange={(e) => handleInputChange(idx, 'label', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none transition-all"
                />
                <input 
                  type="text" 
                  value={stake.value}
                  onChange={(e) => handleInputChange(idx, 'value', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none transition-all"
                />
              </div>
            ))}
          </div>

          {/* Footer Action */}
          <div className="mt-6">
            <button 
              onClick={handleUpdate}
              disabled={isUpdating}
              className="bg-[#1a1a1a] text-white font-bold py-2 px-6 rounded hover:bg-black transition-colors shadow-md disabled:opacity-50"
            >
              {isUpdating ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStakeModal;
