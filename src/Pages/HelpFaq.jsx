import React, { useState } from 'react';
import { motion } from 'framer-motion';

const HelpFaq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: 'What is Gem Hunters?',
      answer: 'Gem Hunters is a blockchain-based game where players hunt for valuable gems, steal from others, and defend their loot to rise on the leaderboard.',
    },
    {
      question: 'How do I start playing?',
      answer: 'To start playing, you need to create an account, connect your wallet, and choose a game mode. From there, you can participate in hunts, stealing attempts, and defense missions.',
    },
    {
      question: 'Is the game free to play?',
      answer: 'Gem Hunters is free to play. However, certain in-game items or advanced features may require transactions with cryptocurrency.',
    },
    {
      question: 'How does the leaderboard work?',
      answer: 'The leaderboard ranks players based on their hunting success, steals, and defense attempts. You can filter it by daily, weekly, monthly, and all-time performance.',
    },
    {
      question: 'Where can I get support if I encounter issues?',
      answer: 'You can reach our support team via the Help & Support section or through our community on Telegram and Discord.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 font-sans text-white py-10 px-4 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-mono font-bold text-center mb-10">Help & FAQ</h1>

        {faqData.map((faq, index) => (
          <div key={index} className="mb-6">
            <motion.button
              onClick={() => toggleFaq(index)}
              className="w-full flex justify-between items-center py-4 px-6 bg-gray-800 rounded-lg text-left hover:bg-gray-700 transition-all duration-300"
              whileHover={{ scale: 1.01 }} // Scale effect on hover
            >
              <span className="text-lg">{faq.question}</span>
              <span className="text-2xl">{activeIndex === index ? '-' : '+'}</span>
            </motion.button>

            {activeIndex === index && (
              <motion.div
                className="bg-gray-800 p-4 rounded-b-lg mt-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                // transition={'ease-in-out'}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.1 }} // Smooth transition for the answer
              >
                <p className="text-base">{faq.answer}</p>
              </motion.div>
            )}
          </div>
        ))}

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="mb-4">If your question isn't answered here, feel free to reach out to our support team or check out the community on Telegram or Discord.</p>
          <div className="flex space-x-4 flex-wrap gap-y-3">
            <motion.a
              href="#"
              className="bg-purple-700 hover:bg-purple-600 py-3 px-6 rounded-lg text-white transition duration-300"
              whileHover={{ scale: 1.05 }} // Scale effect on hover
            >
              Contact Support
            </motion.a>
            <motion.a
              href="https://discord.com"
              className="bg-blue-600 hover:bg-blue-500 py-3 px-6 rounded-lg text-white transition duration-300"
              whileHover={{ scale: 1.05 }} // Scale effect on hover
            >
              Join Discord
            </motion.a>
            <motion.a
              href="https://telegram.org"
              className="bg-green-600 hover:bg-green-500 py-3 px-6 rounded-lg text-white transition duration-300"
              whileHover={{ scale: 1.05 }} // Scale effect on hover
            >
              Join Telegram
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpFaq;
