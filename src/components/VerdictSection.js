// File: src/components/VerdictSection.js
import React from 'react';
import './VerdictSection.css';
import { motion } from 'framer-motion';

export default function VerdictSection() {
  const readings = [
    { title: 'The Wretched of the Earth', author: 'Frantz Fanon' },
    { title: 'Digital Colonialism', author: 'Michael Kwet' },
    { title: 'The Darker Nations', author: 'Vijay Prashad' },
    { title: 'The New Scramble for Africa', author: 'Pádraig Carmody' },
  ];

  const actions = [
    'Support African-owned tech platforms',
    'Donate to digital rights orgs like Access Now or Paradigm Initiative',
    'Call out selective prosecutions and legal bias',
    'Resist extractive aid and trade models',
  ];

  return (
    <motion.section
      className="section verdict-section"
      id="verdict"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2>The Verdict</h2>
      <p className="summary">
        Colonialism never ended—it evolved. Today, its reach extends through courtrooms, contracts, and code.
        If justice is to be meaningful, it must be global, equitable, and accountable.
      </p>

      <div className="verdict-grid">
        <div className="verdict-box">
          <h3>What You Can Do</h3>
          <ul>
            {actions.map((item, i) => (
              <li key={i}>✦ {item}</li>
            ))}
          </ul>
        </div>

        <div className="verdict-box">
          <h3>Read + Reflect</h3>
          <ul>
            {readings.map((book, i) => (
              <li key={i}>
                <em>{book.title}</em> — {book.author}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <blockquote className="verdict-quote">
        <em>"What once came on ships now rides on fiber optics. But the goal remains the same: control."</em>
      </blockquote>
    </motion.section>
  );
}
