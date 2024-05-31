// frontend/src/components/HealthCheck.js

import React, { useEffect, useState } from "react";

function HealthCheck() {

  const [healthCheck, setHealthCheck] = useState(null);

  useEffect(() => {
    const healthCheckUrl = '/convo/health_2';
    console.log('Health check url_2:', healthCheckUrl);
    fetch(healthCheckUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Health check response:', data);
        setHealthCheck(data);
      })
      .catch(error => console.error('Error fetching health check:', error));
  }, []);

  return (
    <div className="box">
      <h1 className="title">Health Check</h1>
      <pre className="code">{JSON.stringify(healthCheck, null, 2)}</pre>
    </div>
  );
}

export default HealthCheck;
