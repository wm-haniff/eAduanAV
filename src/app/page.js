"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle, Volume2, HardHat, Clock } from 'lucide-react';
import Image from 'next/image';

// Custom styles for smooth height transition (necessary for CSS animation)
const transitionStyle = {
  transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out',
  overflow: 'hidden',
};

const faqList = [
  {
    icon: <AlertCircle className="w-6 h-6 text-red-500 mr-3" />,
    question: "1. Why is the projector not turning on?",
    answer: (
      <div className="space-y-4">
        <p className='font-medium text-gray-800'>
          Please check the following basic steps:
        </p>
        <ul className="list-disc ml-8 space-y-2 text-sm text-gray-600">
          <li>Ensure that all the following switches are in the <b>ON position</b>:</li>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 my-3'>
            <Image
              src="/suis.jpg"     
              width={250}
              height={150}
              alt="Projector Issue Troubleshooting"
              className="rounded-lg shadow-lg border border-gray-300 "
              style={{width: '100%', height: '80%', objectFit: 'contain'}}
            />
            <Image
              src="/plug.jpg"    
              width={250}
              height={150}
              alt="Projector Issue Troubleshooting"
              className="rounded-lg shadow-lg border border-gray-300"
              style={{width: '100%', height: '80%', objectFit: 'contain'}}
            />
            <Image
              src="/controlPanel.jpg"    
              width={250}
              height={150}
              alt="Projector Issue Troubleshooting"
              className="rounded-lg shadow-lg border border-gray-300"
              style={{width: '100%', height: '80%', objectFit: 'contain'}}
            />
          </div>
          <li>Ensure the <b>HDMI cable </b>is securely connected to both the laptop and the control panel</li>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 my-3">
          <Image
            src="/HDMI.png"    
            width={250}
            height={150}
            alt="Projector Issue Troubleshooting"
            className="rounded-lg shadow-lg border border-gray-300"
            style={{width: '100%', height: '80%', objectFit: 'contain'}}
          />
          <Image
            src="/control.jpg"    
            width={250}
            height={150}
            alt="Projector Issue Troubleshooting"
            className="rounded-lg shadow-lg border border-gray-300"
            style={{width: '100%', height: '80%', objectFit: 'contain'}}
          />
          </div>
          <li>Press the <b>HDMI</b> button on the control panel</li>
          <Image
            src="/HDMIbutton.jpg"    
            width={350}
            height={150}
            alt="Projector Issue Troubleshooting"
            className="rounded-lg shadow-lg border border-gray-300"
            style={{width: '100%', height: '80%', objectFit: 'contain'}}
          />
          <p className='text-red-600 text-lg font-bold'>If there is no display on the projector screen, please follow the steps below: </p>  
          <li>Right-click on the desktop and select <b>'Display Settings'</b>, then choose <b>'Duplicate these displays'</b> under the Multiple Displays section</li>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 my-3">
            <Image
            src="/display.jpg"    
            width={250}
            height={150}
            alt="Projector Issue Troubleshooting"
            className="rounded-lg shadow-lg border border-gray-300"
            style={{width: '100%', height: '80%', objectFit: 'contain'}}
            />
            <Image
            src="/displaySetting.jpg"    
            width={350}
            height={150}
            alt="Projector Issue Troubleshooting"
            className="rounded-lg shadow-lg border border-gray-300"
            style={{width: '100%', height: '80%', objectFit: 'contain'}}
            />
          </div>
        </ul>
      </div>
    ),
  },
  {
    icon: <Volume2 className="w-6 h-6 text-blue-500 mr-3" />,
    question: "2. Why is there no sound from the speaker?",
    answer: (
      <div className="space-y-4">
        <ul className="list-disc ml-8 space-y-2 text-sm text-gray-600">
          <li>Please make sure that the <b>audiojack is connected</b> to the laptop</li>
          <li>Select the <b>'Sound Output'</b> and then choose the correct <b>'Output Device'</b></li>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 my-3">
            <Image
              src="/sound.png"    
              width={250}
              height={150}
              alt="Projector Issue Troubleshooting"
              className="rounded-lg shadow-lg border border-gray-300"
              style={{width: '100%', height: '80%', objectFit: 'contain'}}
            />
            <Image
              src="/soundOutput.png"    
              width={250}
              height={150}
              alt="Projector Issue Troubleshooting"
              className="rounded-lg shadow-lg border border-gray-300"
              style={{width: '100%', height: '80%', objectFit: 'contain'}}
            />
            </div>
        </ul>
      </div>
    ),
  },
  {
    icon: <HardHat className="w-6 h-6 text-yellow-600 mr-3" />,
    question: "3. How do I make a report for faulty AV equipment?",
    answer: (
      <div className="space-y-4">
        <p className="font-medium text-gray-800">
          Follow these steps to submit a report:
        </p>
        <ol className="list-decimal ml-8 mt-2 space-y-1 text-sm text-gray-700">
          <li>Please click the <b>Laporkan Aduan</b> button below.</li>
          <li>Fill in the required information in the form.</li>
          <li>Submit your report.</li>
        </ol>

        {/* Report Button */}
        <div className="flex justify-center mt-6">
          <a
            href="/report"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-indigo-700 text-white rounded-full shadow hover:bg-indigo-800 transition"
          >
          Laporkan Aduan
          </a>
        </div>
      </div>
    ),
  },
];

const FAQItem = ({ item, index, activeFAQ, handleToggle }) => {
    const isItemOpen = activeFAQ === index;

    return (
        <div
            key={index}
            className="bg-white shadow-xl rounded-2xl overflow-hidden transform hover:shadow-2xl transition duration-300"
        >
            {/* Question Button */}
            <button
                onClick={() => handleToggle(index)}
                className={`w-full text-left px-6 py-5 flex items-center justify-between transition duration-300 ${
                    isItemOpen
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-800 hover:bg-gray-50"
                }`}
            >
                <div className="flex items-center font-semibold text-lg">
                    {/* Render icon and apply color based on active state */}
                    {React.cloneElement(item.icon, { 
                        className: `w-6 h-6 mr-3 ${isItemOpen ? 'text-white' : item.icon.props.className.includes('red') ? 'text-red-500' : item.icon.props.className.includes('blue') ? 'text-blue-500' : 'text-yellow-600'}`
                    })}
                    {item.question}
                </div>
                
                {/* --- Human-Written Icon Logic: Use explicit Lucide icons --- */}
                <span className="ml-4">
                    {isItemOpen 
                        ? <ChevronUp className="w-6 h-6" /> 
                        : <ChevronDown className="w-6 h-6" />}
                </span>
            </button>

            {/* Answer Content */}
            <div
              className={`px-6 py-6 text-gray-700 bg-gray-50/50 transition-all duration-300 overflow-hidden 
              ${isItemOpen ? "max-h-1250 opacity-100" : "max-h-0 opacity-0"}`}
            >
              {item.answer}
            </div>
        </div>
    );
};

export default function App() {
  const [activeFAQ, setActiveFAQ] = useState(null);

  const handleToggle = (index) => {
    if (activeFAQ === index) {
      setActiveFAQ(null);
    } 
    else {
      setActiveFAQ(index);
    }
  };

  return (
    <div className="font-sans min-h-screen bg-gray-50 flex flex-col items-center">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full border-b border-gray-200 py-4 bg-white shadow-sm z-50">
        <div className="flex items-center justify-between mx-auto px-4 max-w-7xl">
          <a href="/" className="text-2xl font-extrabold text-indigo-700 tracking-wider">
          E-ADUAN AV
          </a>

        {/* Dashboard Button */}
        <a
          href="/admin/dashboard"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition"
        >
          Dashboard
        </a>
      </div>
      </nav>


      {/* MAIN CONTENT */}
      <section className="w-full pt-24 pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Text */}
          <div className="text-center mb-16 p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-gray-600 text-xl md:text-2xl font-light mb-2">
              SELAMAT DATANG KE
            </h1>
            <h1 className="text-gray-900 text-4xl md:text-5xl font-extrabold">
              SISTEM ADUAN AV
            </h1>
          </div>

          {/* DUTY HOURS */}
        <div className='lg:col-span-1 mt-10 lg:mt-18'>
          <div className='bg-white p-6 rounded-2xl shadow-xl border-t-4 border-indigo-600'>
            <h3 className='text-2xl font-bold text-gray-800 mb-4 flex items-center'>
              <Clock className='w-6 h-6 mr-3 text-indigo-600'/>
              Waktu Bertugas Bilik Teknikal
            </h3>
            <p className='text-gray-600 mb-4 text-sm'>
              Sila rujuk waktu operasi bilik teknikal di bawah untuk mendapatkan bantuan AV:
            </p>
            <div className='space-y-3'>
              <div className='p-3 bg-indigo-50 rounded-xl border border-indigo-200'>
                <p className='font-semibold text-indigo-700'>Isnin - Jumaat</p>
                <p className='text-xl font-extrabold text-indigo-900'>8:00 AM - 5:00 PM</p>
                <p className="text-xs text-indigo-500 mt-1">Waktu Rehat: 1:00 PM - 2:00 PM</p>
              </div>
              <div className='pt-2'>
                <a href='/report' className='flex items-center justify-center w-full px-5 py-3 bg-indigo-700 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-800 hover:shadow-indigo-200 transition-all duration-300 gap-2'>
                  <HardHat className='w-5 h-5'/>
                  <span>Laporkan Aduan</span>
                </a>
              </div>
            </div>
          </div>
        </div>

          {/* FAQ Section */}
          <h2
            id="faq"
            className="text-gray-800 font-bold text-3xl md:text-4xl mb-10 mt-10 text-center"
          >
            Frequently Asked Questions (FAQ)
          </h2>

          <div className="space-y-4">
            {/* The main component now cleanly maps the data to the dedicated item component */}
            {faqList.map((item, index) => (
              <FAQItem 
                key={index}
                item={item} 
                index={index} 
                activeFAQ={activeFAQ} 
                handleToggle={handleToggle} 
              />
            ))}
          </div>
        </div>

        
      </section>
    </div>
  );
};

