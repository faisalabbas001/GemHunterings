// import React from 'react';
import { FaTelegramPlane, FaDiscord, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 mt-5 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-center px-4">
        {/* Social Media Links */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg mb-4">Follow Us</h3>
          <div className="flex space-x-6">
            <a
              href="https://t.me/GemHunters" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              <FaTelegramPlane size={24} />
            </a>
            <a
              href="https://discord.gg/GemHunters"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-500 transition-colors duration-200"
            >
              <FaDiscord size={24} />
            </a>
            <a
              href="https://twitter.com/GemHunters"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 transition-colors duration-200"
            >
              <FaTwitter size={24} />
            </a>
          </div>
        </div>

        <div className="container  px-4 text-center">
        <p className="text-sm text-gray-400 my-3">
          © {new Date().getFullYear()} Gem Hunters. All rights reserved.
        </p>
      </div>

        {/* Help & Support */}
        <div>
          <h3 className="text-lg mb-4">Help & Support</h3>
          <ul>
            <li>
              <a
                href="/faqs"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                FAQs
              </a>
            </li>
            <li>
              <a
                href="/support"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Support Documentation
              </a>
            </li>
            <li>
              <a
                href="https://discord.gg/GemHuntersSupport"
                target="_blank"
                rel="noreferrer"
                className="hover:text-indigo-500 transition-colors duration-200"
              >
                Discord Support
              </a>
            </li>
          </ul>
        </div>
      </div>

      
    </footer>
  );
};

export default Footer;
