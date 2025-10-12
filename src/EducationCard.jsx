import React, { useEffect } from "react";

function DropInDivs() {
  useEffect(() => {
    // inject safe, unique CSS (avoid Tailwind reserved names like "hidden")
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes dropIn {
        0% { opacity: 0; transform: translateY(-30px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .hide {
        opacity: 0;
        transform: translateY(-30px);
        will-change: opacity, transform;
      }
      .show{
        animation: dropIn 0.55s ease-out forwards;
      }
    `;
    document.head.appendChild(style);

    // select after style injection and after DOM painted
    const items = document.querySelectorAll(".drop-div");
    if (!items.length) return; // nothing to do

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            entry.target.classList.remove("hide");
            obs.unobserve(entry.target); // show once then stop observing
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    items.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      // cleanup injected style
      if (style && style.parentNode) style.parentNode.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-[200vh] bg-gray-100 flex flex-col items-center justify-center space-y-16 py-20">
      <div className="drop-div hide bg-blue-600 text-white p-6 rounded-xl shadow-lg text-lg font-semibold w-80 text-center">
        🌟 First Div
      </div>

      <div className="drop-div hide bg-green-600 text-white p-6 rounded-xl shadow-lg text-lg font-semibold w-80 text-center">
        🚀 Second Div
      </div>

      <div className="drop-div hide bg-pink-600 text-white p-6 rounded-xl shadow-lg text-lg font-semibold w-80 text-center">
        💎 Third Div
      </div>

      <div className="drop-div hide bg-purple-600 text-white p-6 rounded-xl shadow-lg text-lg font-semibold w-80 text-center">
        🔥 Fourth Div
      </div>
    </div>
  );
}

export default DropInDivs;
