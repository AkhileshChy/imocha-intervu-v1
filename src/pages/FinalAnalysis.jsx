import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Gauge, Brain, MessageSquare, Lightbulb, Code, Trophy } from 'lucide-react';
import { useLocation } from 'react-router-dom';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const descriptions = {
    problem_solving_ability: "Ability to analyze and solve complex problems effectively",
    technical_proficiency: "Mastery of technical concepts and implementation",
    structured_thinking: "Capability to organize thoughts and approaches systematically",
    real_world_application: "Practical application of knowledge in real scenarios",
    communication_skills: "Effectiveness in conveying ideas and concepts"
};

function FinalAnalysis() {
    const [scores, setScores] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const testId = queryParams.get("testId");
    const userId = queryParams.get("userId");

    useEffect(() => {
        const fetchScores = async () => {
            try {
                let formData = new FormData();
                formData.append('test_id', testId);
                formData.append('user_id', userId);
                const token = localStorage.getItem("token");
                const response = await fetch('https://intervu-1-0.onrender.com/admin/get_score', {
                    method: 'POST',
                    headers: {
                        "Authorization": `${token}`
                    },
                    credentials: 'include',
                    body: formData
                });
                const res = await response.json();
                console.log(res);
                setScores(res);
            } catch (err) {
                setError('Failed to fetch scores');
                setScores({
                    problem_solving_ability: 23.5,
                    technical_proficiency: 24.0,
                    structured_thinking: 21.0,
                    real_world_application: 22.5,
                    communication_skills: 22.0
                });
            } finally {
                setLoading(false);
            }
        };

        fetchScores();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error || !scores) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-red-600">Error: {error}</div>
            </div>
        );
    }

    const totalScore = Object.values(scores).reduce((acc, curr) => acc + curr, 0);
    const overallPercentage = (totalScore / 150 * 100).toFixed(1);

    const labels = Object.keys(scores).map(key =>
        key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
    );

    const radarData = {
        labels: labels,
        datasets: [
            {
                label: 'Score Analysis',
                data: Object.values(scores),
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                borderColor: 'rgba(99, 102, 241, 1)',
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 text-center mb-12">Final Analysis</h1>

                <div className="flex flex-col gap-8">
                    {/* Overall Score Card - Centered */}
                    <div className="max-w-md mx-auto w-full">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <Trophy className="h-8 w-8 text-indigo-600" />
                                <span className="text-3xl font-bold text-indigo-600">{overallPercentage}%</span>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">Overall Score</h2>
                            <p className="text-gray-600 mt-2">Combined performance across all assessment areas</p>
                        </div>
                    </div>

                    {/* Two Column Layout for Detailed Breakdown and Radar Chart */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Individual Scores Card */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Detailed Breakdown</h2>
                            {Object.entries(scores).map(([key, score]) => (
                                <div className="mb-6" key={key}>
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-medium text-gray-800">
                                            {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                        </h3>
                                        <span className="text-lg font-bold text-indigo-600">{(score / 30 * 100).toFixed(2)}%</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{descriptions[key]}</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className="bg-indigo-600 h-2.5 rounded-full"
                                            style={{ width: `${score/30 * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Radar Chart Card */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Score Distribution</h2>
                            <div className="w-full h-[500px] flex items-center justify-center">
                                <Radar
                                    data={radarData}
                                    options={{
                                        scales: {
                                            r: {
                                                beginAtZero: true,
                                                max: 30,
                                                ticks: {
                                                    stepSize: 5
                                                }
                                            }
                                        },
                                        plugins: {
                                            legend: {
                                                display: false
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FinalAnalysis;