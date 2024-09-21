
'use client';

import { DynamicWidget } from "@/lib/dynamic";
import { useState, useEffect } from 'react';
import DynamicMethods from "@/app/components/Methods";
import './page.css';
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import TrackPets from "@/app/components/trackPets";
import Link from "next/link";

const checkIsDarkSchemePreferred = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia?.('(prefers-color-scheme:dark)')?.matches ?? false;
  }
  return false;
};


export default function Main() {
  const [isDarkMode, setIsDarkMode] = useState(checkIsDarkSchemePreferred);
  const { user } = useDynamicContext();

  useEffect(() => {
    //trackPets();
    //fetchPets();
  }, []);

  const urls = [
    { url: "https://h6tgmhtrk6y53ttb.public.blob.vercel-storage.com/Snap_20240921-113648-0-KYo4nniZTgBpvfNMaWiyntFz0qjKdT.jpg", text: "Wasabi, eating, 2024-09-21 11:36:48." },
    { url: "https://h6tgmhtrk6y53ttb.public.blob.vercel-storage.com/Snap_20240921-120317-0-3AeFQgkuSjl05BD0iKU35pyNJEG7yp.jpg", text: "Pedro, eating, 2024-09-21 12:03:17." },
    { url: "https://h6tgmhtrk6y53ttb.public.blob.vercel-storage.com/Snap_20240921-130945-0-R5XnydHCwLNBALus0YBO9PLyTZJD6k.jpg", text: "Chiqui, eating, 2024-09-21 13:09:45." },
    { url: "https://h6tgmhtrk6y53ttb.public.blob.vercel-storage.com/Snap_20240921-131149-2-vDpm9h6LHnQV460oS4R2uPY5Nbr8NJ.jpg", text: "Chiqui, drinking, 2024-09-21 13:11:50." },
    { url: "https://h6tgmhtrk6y53ttb.public.blob.vercel-storage.com/Snap_20240921-141439-2-5Qt8ZzaBlydCroE6zvDiUxp8rx6Vzx.jpg", text: "Wasabi, drinking, 2024-09-21 14:14:40." },
    { url: "https://h6tgmhtrk6y53ttb.public.blob.vercel-storage.com/Snap_20240921-172646-2-6FGEO9kcwDm5ygxFbCEYZmKdcwctTS.jpg", text: "Chiqui, eating, 2024-09-21 17:26:47." }
  ];

  const concatenatedText = urls.map(item => item.text).join(' ');

console.log(concatenatedText);

  return (
    <div className={`container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="header">
        <img className="logo-header" src="/logo.png" alt="TailTrack" height="100px" />
        <div><h1>PetTracker</h1></div>
        <div className="modal">
          <DynamicWidget />
        </div>
      </div>
      <div className="main-content">
        {user ? (
          <div>
            <div><p>User: {user.userId}</p></div>
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {urls.map((item, index) => (
                  <div key={index} style={{ flex: '1 0 33%', padding: '5px', textAlign: 'center' }}>
                    <img className="cam" src={item.url} alt={`Image ${index + 1}`} style={{ width: '100%' }} />
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <h1>Daily Report</h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                {urls.map((item, index) => (
                    <p key={index}>{item.text}</p>
                ))}
            </div>
          </div>
        ) : (
          ""
        )}      </div>

      <div className="footer">
        <img className="logo" src="/logo-primary.png" alt="dynamic" />

        <img className="logo" src="/gaia-light.png" alt="gaia" />

        <img className="logo" src="/phala.png" alt="phala" />
      </div>
    </div>
  );
}
