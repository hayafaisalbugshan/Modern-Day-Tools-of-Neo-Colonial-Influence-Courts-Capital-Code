// File: src/App.js
import React, { useEffect } from 'react';
import './App.css';
import { motion } from 'framer-motion';
import IccCaseMap from './components/IccCaseMap';
import IccTimeline from './components/IccTimeline';
import ColonialGraph from './components/ColonialGraph';
import ShutdownCostChart from './components/ShutdownCostChart';
import VerdictSection from './components/VerdictSection';
import VerdictWordCloud from './components/VerdictWordCloud';
import './components/VerdictWordCloud.css';

function App() {
  useEffect(() => {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="App">
      <header className="hero">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Modern-Day Tools of Neo-Colonial Influence
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          How Courts, Capital, and Code shape the Global South
        </motion.p>
      </header>

      <motion.section
        className="section courts"
        id="courts"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2>Courts: Judgments Abroad, Reverberations at Home</h2>
        <p>
          When the gavel falls in The Hague, it echoes through villages thousands of miles away—shaping futures long after headlines fade.
        </p>
        <p>
          The International Criminal Court has long been considered the global arbitrator of justice. Yet, 90% of the charges that it has made since its inception have focused on African Leaders. Africa leads the list of ICC defendants, although making up a small percentage (20%) of ICC member states. This disparity indicates not only the persistence of colonial reasoning but also the unfair portrayal of the African government as fundamentally illegitimate and in need of international supervision, unable to possess political sovereignty.
        </p>
        
        <IccCaseMap />

        <div className="narrative-block">
          <p>
            A red map, a world split in its judgment: while some nations navigate with impunity, others are shackled by scrutiny. This visualization is not just a geographic overview—it's a power diagram where justice becomes a matter of geography.
          </p>
        </div>

        <IccTimeline />

        <div className="narrative-block">
          <p>
            The pattern becomes more evident when laid out over time. The global timeline of ICC prosecutions reveals who is silenced and who is shielded. Each dot, a verdict not just against a person—but against the perceived legitimacy of a continent.
          </p>
        </div>
      </motion.section>

      <motion.section
        className="section capital"
        id="capital"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2>Capital: Old Exploits, New Economies</h2>
        <p>
          As their leaders face prosecution, the economy cripples dependent on the hand that feeds it. The continent rich in oil, gold, and natural resources continues to lose potentially billions of dollars annually as a result of extractive trade agreements and foreign-owned enterprises.
        </p>

        <ColonialGraph />

        <div className="narrative-block">
          <p>
            This is the colonial continuity chain: a tangle of old debts, imposed dependencies, and foreign-directed governance. The web tightens through high debt and low human development indices—visually capturing the chokehold of neocolonial economics.
          </p>
        </div>
      </motion.section>

      <motion.section
        className="section code"
        id="code"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2>Code: Silence at the Speed of Light</h2>
        <p>
          The third and most recent frontier of control is the digital world. Africans cannot speak, organize, or oppose without the say-so of Western tech giants. From content suppression to entire internet shutdowns, digital colonialism enforces a new regime of compliance.
        </p>

        <ShutdownCostChart />

        <VerdictWordCloud />

        <div className="narrative-block">
          <p>
            What happens when the lights go out? When speech is severed by cables built by foreign hands? These shutdowns cost not just billions—they erase voices, movements, and entire moments in the fight for sovereignty.
          </p>
        </div>
      </motion.section>
      <VerdictSection />
      <motion.footer
        className="App-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p>
          Together, code, capital, and courts form the scaffolding of the 21st-century empire—one that has never left the Western sphere.
        </p>
      </motion.footer>
    </div>
  );
}

export default App;




