import React from 'react';
import { Code2, Brain, MessageCircle } from 'lucide-react';

// interface ScoreCardProps {
//   title: string;
//   score: number;
//   description: string;
//   type: 'score' | 'problem' | 'communication';
// }

const ScoreCard = ({ title, score, description, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'score':
        return <Code2 className="w-6 h-6 text-orange-500" />;
      case 'problem':
        return <Brain className="w-6 h-6 text-green-500" />;
      case 'communication':
        return <MessageCircle className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        {getIcon()}
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
      </div>
      <div className="mb-2">
        <span className="text-4xl font-bold text-indigo-600">{score}%</span>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ScoreCard;
