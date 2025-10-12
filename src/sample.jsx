import React from 'react';

const Skills = () => {
  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">My Skills</h1>
      <div className="whitespace-pre-line text-gray-200">
        {`Front-End:
  Languages: HTML, CSS, JavaScript, TypeScript
  Frameworks: React, Next.js
  Styling: Tailwind CSS, CSS Modules, SASS
  Animations: CSS Animations, Framer Motion, Typewriter Effects

Back-End:
  Languages: Node.js, JavaScript
  Frameworks: Express.js, MERN Stack
  Databases: MongoDB, MySQL
  APIs: REST API, CRUD Operations, Aggregation Pipelines

Tools:
  Git, VS Code, npm, Postman, MongoDB Compass

Additional Skills:
  - Responsive Web Design
  - State Management (useState, useContext, Redux basics)
  - Deployment (Vercel, Netlify, Heroku)
  - Debugging & Code Optimization`}
      </div>
    </div>
  );
};

export default Skills;
