import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const teamMembers = [
  {
    name: 'Viraj Walavalkar',
    role: 'Backend Developer',
    photo: '/Viraj.jpg',
    github: 'https://github.com/Viraj-Walavalkar',
    linkedin: 'https://www.linkedin.com/in/viraj-walavalkar-836463251/',
    techStack: ['Python', 'Flask', 'LangChain','MongoDB']
  },
  {
    name: 'Mitesh Jain',
    role: 'Frontend Developer',
    photo: '/Mitesh.jpg',
    github: 'https://github.com/jainmitesh2393',
    linkedin: 'https://www.linkedin.com/in/mitesh-jain-76528025b/',
    techStack: ['Next.js', 'React.js', 'Javascript','C++']
  },
  {
    name: 'Akhilesh Choudhary',
    role: 'Frontend Developer',
    photo: '/Akhilesh.jpg',
    github: 'https://github.com/AkhileshChy',
    linkedin: 'https://www.linkedin.com/in/akhilesh-choudhary-153aa2256/',
    techStack: ['Next.js', 'React.js', 'Javascript','C++']
  },
  {
    name: 'Nishant Desale',
    role: 'Backend Developer',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    github: 'https://github.com/Nishantd1402',
    linkedin: 'https://www.linkedin.com/in/nishant-desale-982b49268/',
    techStack: ['Python', 'Flask','LangChain','ML']
  }
];

function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Team Photo */}
      <div className="relative h-[800px] w-full">
        <img
          src="/Team3.jpg"
          alt="Team Photo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0  flex py-16 justify-center ">
          <h1 className="text-8xl  md:text-7xl font-bold text-white text-center">
            Meet Our Team
          </h1>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="space-y-6">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:-translate-y-1 flex flex-col sm:flex-row"
            >
              <div className="sm:w-48 md:w-64">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-48 sm:h-full object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-indigo-600 font-medium mt-1">{member.role}</p>
                  
                  {/* Tech Stack */}
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-500 mb-2">Tech Stack:</p>
                    <div className="flex flex-wrap gap-2">
                      {member.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-6 flex space-x-4">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
