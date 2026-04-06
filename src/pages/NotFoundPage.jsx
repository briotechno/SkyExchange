import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <Layout>
      <div className="full-wrap">
        <div id="centerColumn" className="col-center" style={{ padding: '40px', textAlign: 'center' }}>
          <h2>Page Not Found (404)</h2>
          <p>The page you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
            Go to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default NotFoundPage;
