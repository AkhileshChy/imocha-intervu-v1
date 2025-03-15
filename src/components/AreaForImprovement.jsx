import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';



function AreaForImprovement({ data }) {

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">Areas for Improvement</h3>
        {data['Areas for Improvement'].map((item, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            <p className="text-gray-700">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AreaForImprovement;
