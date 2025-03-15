import React from 'react';

// interface SkillAnalysisProps {
//   title: string;
//   score: number;
//   description: string;
// }

const SkillAnalysis = ({ title, score, description }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        <span className="text-lg font-bold text-indigo-600">{score}%</span>
      </div>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-indigo-600 h-2.5 rounded-full"
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SkillAnalysis;
