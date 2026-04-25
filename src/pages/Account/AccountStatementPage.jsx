import React, { useState, useEffect } from 'react';
import AccountLayout from './AccountLayout';
import { useAuthStore } from '../../store/authStore';
import { statementController } from '../../controllers';

function AccountStatementPage() {
  const { loginToken, isLoggedIn } = useAuthStore();
  const [statementData, setStatementData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Default dates: last 7 days
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0];
  };

  const formatDateForApi = (dateStr) => {
    // Convert YYYY-MM-DD to DD-MM-YYYY
    const [y, m, d] = dateStr.split('-');
    return `${d}-${m}-${y}`;
  };

  const [startDate, setStartDate] = useState(formatDateForInput(sevenDaysAgo));
  const [endDate, setEndDate] = useState(formatDateForInput(today));

  const fetchStatement = async () => {
    if (!isLoggedIn || !loginToken) return;
    try {
      setLoading(true);
      const res = await statementController.getAccountStatement(
        loginToken,
        formatDateForApi(startDate),
        formatDateForApi(endDate)
      );

      if (res && typeof res === 'object' && !res.error) {
        // Convert object of objects to array
        const dataArray = Object.values(res).filter(item => typeof item === 'object' && item !== null);
        setStatementData(dataArray);
      } else {
        setStatementData([]);
      }
    } catch (err) {
      console.error('Failed to fetch statement:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatement();
  }, [isLoggedIn, loginToken]);

  return (
    <AccountLayout title="Account Statement">
      <div className="filters-row" style={{ display: 'flex', gap: '10px', marginBottom: '20px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div className="filter-group">
          <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>From</label>
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)}
            className="filter-input"
            style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div className="filter-group">
          <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>To</label>
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)}
            className="filter-input"
            style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <button 
          onClick={fetchStatement}
          className="btn-search"
          style={{ 
            padding: '7px 20px', 
            background: '#ffb400', 
            border: 'none', 
            borderRadius: '4px', 
            fontWeight: 'bold', 
            cursor: 'pointer' 
          }}
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table balance-table">
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Date/Time</th>
              <th style={{ textAlign: 'center' }}>Deposit</th>
              <th style={{ textAlign: 'center' }}>Withdraw</th>
              <th style={{ textAlign: 'center' }}>Balance</th>
              <th style={{ textAlign: 'left' }}>Remark</th>
            </tr>
          </thead>
          <tbody>
            {statementData.length > 0 ? (
              statementData.map((row, idx) => {
                const date = row["0"];
                const amount = parseFloat(row["1"]);
                const type = row["2"]; // O, DR, CR
                const remark = row["3"];

                return (
                  <tr key={idx}>
                    <td style={{ textAlign: 'left' }}>{date}</td>
                    <td style={{ textAlign: 'center', color: 'green' }}>
                      {type === 'CR' ? amount.toFixed(2) : '-'}
                    </td>
                    <td style={{ textAlign: 'center', color: 'red' }}>
                      {type === 'DR' ? amount.toFixed(2) : '-'}
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 'bold' }}>
                      {type === 'O' ? amount.toFixed(2) : '-'}
                    </td>
                    <td style={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: remark }}></td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" style={{ padding: '15px', textAlign: 'center' }}>
                  {loading ? 'Fetching data...' : 'No Data Available'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AccountLayout>
  );
}

export default AccountStatementPage;
