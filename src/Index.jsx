import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import useActiveSection from './ActiveSection';
import './Index.css'
import './Typewriter.css'

function Index() {

  const [isFixed, setIsFixed] = useState(false);
  const [clicked, setClicked] = useState(false);
  const texts = ['React Developer', 'Front-End Developer','Back-End Developer', 'MERN Stack Developer'];
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [pause, setPause] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

library.add(fas, far, fab)

  const skills = [
    { name: "HTML", url: "html_logo.png"},
    { name: "Tailwind CSS", url: "tailwind_logo.png"},
    { name: "Javascript", url: "javascript_logo.png"},
    { name: "React", url:"react_logo.png"},
    { name: "Node.js", url: "node_logo.png"},
    { name: "Express.js", url: "expressjs_logo.png"},
    { name: "MongoDB", url: "mongodb_logo.png"},
    { name: "Github", url: "github_logo.png"},
  ];


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      alert(data.message); // success or failure message
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to send email");
    }
  };

  useEffect(() => {
    if (pause) return;

    const currentText = texts[textIndex];
    const speed = isDeleting ? 25 : 50;

    const timeout = setTimeout(() => {
      const nextText = isDeleting
        ? currentText.slice(0, displayedText.length - 1)
        : currentText.slice(0, displayedText.length + 1);

      setDisplayedText(nextText);

      // When finished typing
      if (!isDeleting && nextText === currentText) {
        setPause(true);
        setTimeout(() => {
          setIsDeleting(true);
          setPause(false);
        }, 1000); // pause after full text
      }

      // When finished deleting
      if (isDeleting && nextText === '') {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, pause, textIndex]);

  const active = useActiveSection(['home', 'about', 'skills', 'projects', 'contact']);
  const getClasses = (id) =>
    `flex gap-1 items-center transition-all duration-300 p-1 px-2 rounded-lg
     ${active === id ? 'scale-110 text-blue-500 font-semibold' : 'hover:text-blue-300 hover:scale-105'}`;
  
  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 100); 
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    <div className='main text-white'>
      <nav className={`container h-auto text-white max-w-screen absolute items-center md:justify-start transition-all duration-300 bg-gradient-to-br from-gray-700 to-slate-800 rounded-lg text-sm  overflow-hidden ${clicked ? "h-60 md:h-20":"h-20 md:h-20"} ${isFixed ? "fixed top-0 left-0 right-0 z-50 shadow-md rounded-none rounded-b-3xl bg-gradient-to-tl from-gray-700 to-slate-800" : "relative"} ${isFixed && clicked ? "md:h-40":"md:h-20"}`}>
          <div className='flex items-center w-full'>
            <div className='flex w-full md:w-auto items-center h-20 px-5 pr-10'>
              <img src='Sudheep logo.png' alt='Profile' className='h-10 w-auto lg:h-15 lg:pr-2'/>
              <div className='text-xs md:text-md lg:text-xl font-bold h-10 lg:h-15'>
                <h5>Sudheep M</h5>
                <h5>Full Stack Developer </h5>
              </div>
            </div>
            <button className='flex pr-10 items-center md:hidden h-20' onClick={()=>setClicked(!clicked)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            </button> 
          <div className='hidden justify-evenly w-xl items-center md:flex h-10 border-l-1'>
            <a href='#home'className={`flex ${getClasses('home')} hover:text-blue-300 gap-1 items-center hover:scale-120 transition-all duration-300 p-1 px-2 rounded-lg`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
              <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
              <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
              Home</a>
            <a href='#about' className={`flex ${getClasses('about')} hover:text-blue-300 gap-1 items-center hover:scale-120 transition-all duration-300 p-1 px-2 rounded-lg`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 ">
              <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
              </svg>
              About Me</a>
            <a href='#skills' className={`flex ${getClasses('skills')} hover:text-blue-300 gap-1 items-center hover:scale-120 transition-all duration-300 p-1 px-2 rounded-lg`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
              <path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clipRule="evenodd" />
              <path d="m10.076 8.64-2.201-2.2V4.874a.75.75 0 0 0-.364-.643l-3.75-2.25a.75.75 0 0 0-.916.113l-.75.75a.75.75 0 0 0-.113.916l2.25 3.75a.75.75 0 0 0 .643.364h1.564l2.062 2.062 1.575-1.297Z" />
              <path fillRule="evenodd" d="m12.556 17.329 4.183 4.182a3.375 3.375 0 0 0 4.773-4.773l-3.306-3.305a6.803 6.803 0 0 1-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 0 0-.167.063l-3.086 3.748Zm3.414-1.36a.75.75 0 0 1 1.06 0l1.875 1.876a.75.75 0 1 1-1.06 1.06L15.97 17.03a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
              Skills</a>
            {/* <a href='#projects' className={`flex ${getClasses('projects')} hover:text-blue-300 gap-1 items-center hover:scale-120 transition-all duration-300 p-1 px-2 rounded-lg`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
              </svg>
              Projects</a> */}
            <a href='#contact' className={`flex ${getClasses('contact')} hover:text-blue-300 gap-1 items-center hover:scale-120 transition-all duration-300 p-1 px-2 rounded-lg`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75  0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z" clipRule="evenodd" />
              </svg>
              Contact</a>
          </div>  
        </div>
        <div>    
          {clicked &&(
              <div className={`pb-5 md:hidden`}>
                <ul className={`flex flex-wrap justify-center place-items-start`}>
                  <li className='border py-2 m-2 rounded-2xl bg-slate-700 text-center w-1/3'><a href='#home' className='hover:text-blue-300'>
                    Home</a></li>
                  <li className='border py-2 m-2 rounded-2xl bg-slate-700 text-center w-1/3'><a href='#about' className='hover:text-blue-300'>
                    About
                    </a></li>
                  <li className='border py-2 m-2 rounded-2xl bg-slate-700 text-center w-1/3'><a href='#skills' className='hover:text-blue-300'>
                    Skills
                    </a></li>
                  {/* <li className='border py-2 m-2 rounded-2xl bg-slate-700 text-center w-1/3'><a href='#projects' className='hover:text-blue-300'>
                    Projects
                  </a></li> */}
                  <li className='border py-2 m-2 rounded-2xl bg-slate-700 text-center w-1/3'><a href='#contact' className='hover:text-blue-300'>
                    Contact
                  </a></li>
                </ul>
            </div>)}
        </div>  
      </nav>
      <section id='home' className={`md:h-130 md:snap-start flex flex-col md:flex-row items-center inset-shadow inset-shadow-cyan-500/50 justify-center rounded-xl p-8 md:p-16 text-white ${isFixed? "mt-60 md:mt-20":"mt-0"}`}>
        <div className='w-full md:w-1/2 flex inset-1 justify-center'>
          <img
            src='sudheep5.png'
            alt='Sudheep M'
            className='w-64 h-64 object-cover rounded-full bg-[url(/Coding-gif.gif)] bg-slate-500 inset-shadow-sm inset-shadow-white shadow-white shadow-md'
          />
        </div>
        <div className='w-full flex flex-col md:w-1/2 gap-4 text-left'>
          <h1 className="text-4xl text-yellow-400 font-bold">Hi,</h1>
          <h1 className="text-4xl text-yellow-400 font-bold">I'am Sudheep M</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-300">
          {displayedText}
          <span className="cursor" /></h2>
          <div className='flex gap-5'>
          <a href="Sudheep_resume.pdf" download className="mt-10 text-sm md:font-medium bold w-40 h-10 justify-center border-2 inline-flex border-blue-400 gap-2 bg-gray-800 items-center rounded-lg hover:scale-105 duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 md:size-6">
            <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" /></svg>
            Download CV
          </a>
          <a href="#contact" className="mt-10 w-40 h-10 justify-center inline-flex gap-2 items-center rounded-lg hover:scale-105 duration-300 hover:shadow-[inset_0_0_10px_20px_rgba(37,99,235,0.6)]">
            Contact me
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
          </div>
        </div>
      </section>
        <div id="about" className='mb-20'></div>
      <section className="p-10 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-xl ">
        <section>
          <h2 className="text-3xl font-bold mb-6">About Me</h2>
          <p className="text-lg leading-relaxed mb-6">
            Hi, I’m <span className="font-semibold text-yellow-400">Sudheep M</span>,
            a passionate <span className="font-semibold">MERN Stack Developer </span>who loves building responsive and user-friendly web applications.
          </p>
          <p className="text-base leading-relaxed mb-6">
            I specialize in <span className="font-medium">React, Node.js, Express, MongoDB, and TailwindCSS</span>. My focus is on writing clean, scalable code and delivering modern
            UI/UX experiences. I’m constantly learning new technologies and
            improving my craft.
          </p>
          <p className="text-base leading-relaxed mb-6">
            Currently, I’m looking for opportunities to{" "}
            <span className="font-medium">
              grow as a full-stack developer
            </span>{" "}
            and contribute to impactful projects. Beyond coding, I enjoy exploring
            design trends, solving coding challenges, and collaborating with other
            developers.
          </p>
          <p className="text-base font-medium">
            Always excited to learn, build, and share knowledge. Let’s
            connect!
          </p>
        </section>
        <section className="pt-10 md:w-fit md:mx-auto bg-gray-50 dark:bg-gray-900">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Education
          </h2>
          <div className="md:flex md:mx-auto p-5 border  justify-between border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className=" md:w-fit xl:pr-40 cursor-default">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Bachelor of Computer Application (BCA)
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Bishop Heber College, Tiruchirappalli • 2022 – 2025
              </p>
              <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">
                Focused on full-stack development, algorithms, and system design.
              </p>
            </div>
            <div className='md:border-r-1'></div>
            <div className="mt-10 md:mt-0 md:text-right xl:pl-40 cursor-default">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Higher Secondary Schooling
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Nehru Matriclation Higher Secondary School, Nagapattinam • 2021 – 2022
              </p>
              <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">
                Specialized in Science (Maths & Computer Science).
              </p>
            </div>
          </div>
        </section>
        <div id="skills"></div>

      </section>
        <div id="skills" className='mb-20'></div>
      <section className='rounded-xl'>
        <div className="p-6 shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold mb-10">My Skills</h2>
          <div className='flex gap-10 sm:flex-row flex-wrap items-center justify-evenly'>
          {skills.map((skill, index) => (
            <div key={index} className="flex flex-col mb-10 md:hover:scale-105 hover:scale-110 md:hover:-translate-y-8 duration-200 bg-white/70 hover:shadow-[inset_0_0_20px_150px_white] rounded-3xl md:rounded-full aspect-square px-10 h-30 w-30 md:w-55 md:h-55 items-center justify-center">
                <img src={skill.url} alt={skill.name.split("/").pop().split(".")[0]} className='h-10 md:h-30' />
                <h1 className='md:text-xl font-bold text-center text-gray-900 '>{skill.name}</h1>
            </div>
          ))}
          </div>
        </div>
      </section>
      <div id="contact" className='mb-20'></div>
      <section className='md:bg-[url(/sudheep-bg1.jpg)] bg-gray-800 bg-cover rounded-xl p-10 mt-10 min-h-screen md:flex'>
        <div className='md:flex md:flex-col hidden justify-end text-3xl text-black md:gap-10 md:justify-center px-5'>
            <a target='_blank' href='https://www.instagram.com/sudheep_7_'><FontAwesomeIcon className="" icon="fa-brands fa-instagram"/></a>
            <a target='_blank' href='https://www.linkedin.com/in/sudheep-m-331a6531b/'><FontAwesomeIcon className="" icon="fa-brands fa-linkedin" /></a>
            <a target='_blank' href='https://www.facebook.com/sudheepMSD'><FontAwesomeIcon className="" icon="fa-brands fa-facebook" /></a>
            <a target='_blank' href='https://github.com/Sudheep-M'><FontAwesomeIcon className="text-3xl" icon="fa-brands fa-github" /></a>
        </div>
        <div className=" rounded-2xl md:p-10 md:text-black lg:w-1/3 max-w-lg text-left">
          <h2 className="text-3xl text-gray-500 font-bold mb-4">
            Let's <span className='text-yellow-300'>Talk</span>
          </h2>
          <p className="mb-6">
            Feel free to reach out by filling the form below.
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2">Your Name</label>
              <input
                type="text"
                name='name'
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full p-3 bg-gray-600/75 rounded-xl focus:border-none focus:outline-none focus:ring-3 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Email Address</label>
              <input
                type="email"
                name='email'
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-3 bg-gray-600/75 rounded-lg focus:border-none focus:outline-none focus:ring-3 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Message</label>
              <textarea
                rows="4"
                name='message'
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className="w-full p-3 bg-gray-600/75 rounded-lg focus:border-none focus:outline-none focus:ring-3 focus:ring-blue-600"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md"
            >
              Send Message
            </button>
          </form>
          <div className="mt-6 text-center md:text-black text-sm">
            Or email me directly by clicking{" "}
            <a
              href="mailto:sudheepmuruganantham@gmail.com"
              className="text-blue-700 md:bg-white/30 px-2  rounded-2xl font-semibold hover:underline"
            >
              sudheepmuruganantham@gmail.com
            </a>
          </div>
        <div className='flex md:flex-col mt-5 text-xl md:hidden justify-end gap-2 md:justify-center px-5'>
          {/* <h1 className='text-lg font-bold mr-2'>Follow me on:</h1> */}
            <a target='_blank' href='https://www.instagram.com/sudheep_7_'><FontAwesomeIcon icon="fa-brands fa-instagram"/></a>
            <a target='_blank' href='https://www.linkedin.com/in/sudheep-m-331a6531b/'><FontAwesomeIcon icon="fa-brands fa-linkedin" /></a>
            <a target='_blank' href='https://www.facebook.com/sudheepMSD'><FontAwesomeIcon icon="fa-brands fa-facebook" /></a>
            <a target='_blank' href='https://github.com/Sudheep-M'><FontAwesomeIcon icon="fa-brands fa-github" /></a>
        </div>
        </div>
        {/* <div className='w-3/4 text-sm'>
          <div className='flex gap-5 justify-end place-items-end'>
          
          </div>
        </div> */}
      </section>
        <div className="container font-medium mx-auto py-5 bottom-0 text-center">&copy; 2025 Sudheep M. All rights reserved.</div>
</div>

    </>
)
}

export default Index;