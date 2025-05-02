// File: src/components/VerdictWordCloud.js

import React from 'react';
import WordCloud from 'react-d3-cloud';
import './VerdictWordCloud.css';

const iccWords = [
  { text: 'Genocide', value: 90 },
  { text: 'War Crimes', value: 85 },
  { text: 'Torture', value: 80 },
  { text: 'Persecution', value: 75 },
  { text: 'Rape', value: 70 },
  { text: 'Enslavement', value: 65 },
  { text: 'Murder', value: 60 },
  { text: 'Forced Displacement', value: 55 },
  { text: 'Ethnic Cleansing', value: 50 },
  { text: 'Conscription', value: 48 },
  { text: 'Pillage', value: 45 },
  { text: 'Sexual Violence', value: 42 },
  { text: 'Execution', value: 40 },
  { text: 'Imprisonment', value: 38 },
  { text: 'Extermination', value: 36 },
  { text: 'Hostage Taking', value: 34 },
  { text: 'Deportation', value: 32 },
  { text: 'Crimes Against Humanity', value: 30 },
  { text: 'Aggression', value: 28 },
  { text: 'Child Soldiers', value: 26 },
  { text: 'Human Trafficking', value: 24 },
  { text: 'Massacre', value: 22 },
  { text: 'War Rape', value: 20 },
  { text: 'Ethnic Targeting', value: 18 },
  { text: 'Militia Violence', value: 16 },
  { text: 'Tribal Killings', value: 14 }
];

const westernWords = [
  { text: 'Genocide', value: 60 },
  { text: 'War Crimes', value: 55 },
  { text: 'Civilian Harm', value: 50 },
  { text: 'Collateral Damage', value: 48 },
  { text: 'Operational Necessity', value: 46 },
  { text: 'National Interest', value: 44 },
  { text: 'Combat Operations', value: 42 },
  { text: 'Unintended Casualties', value: 40 },
  { text: 'Preemptive Strike', value: 38 },
  { text: 'Security Measures', value: 36 },
  { text: 'Target Neutralization', value: 34 },
  { text: 'Enhanced Interrogation', value: 32 },
  { text: 'Mission Success', value: 30 },
  { text: 'Strategic Objective', value: 28 },
  { text: 'Freedom Protection', value: 26 },
  { text: 'Democratic Transition', value: 24 },
  { text: 'Peacekeeping Force', value: 22 },
  { text: 'Foreign Aid Operation', value: 20 },
  { text: 'Civil Society Engagement', value: 18 },
  { text: 'Reconstruction Mission', value: 16 },
  { text: 'Stability Initiative', value: 14 },
  { text: 'Terrorism Prevention', value: 12 },
  { text: 'Intelligence Gathering', value: 10 },
  { text: 'Safe Zone Establishment', value: 8 },
  { text: 'Humanitarian Corridor', value: 6 }
];

const fontSizeMapper = word => Math.log2(word.value) * 8;
const rotate = () => 0;

export default function VerdictWordCloud() {
  return (
    <div className="verdict-container">
      <h2>Framing Justice</h2>
      <p>
        These word clouds compare how war crimes are described in ICC indictments versus how similar actions are framed in reports on Western military conduct.
        The contrast reveals a deeper, structural bias.
      </p>
      <div className="wordcloud-wrapper">
        <div className="wordcloud-section">
          <h3>African ICC Indictments</h3>
          <WordCloud
            data={iccWords}
            fontSizeMapper={fontSizeMapper}
            rotate={rotate}
            width={200}
            height={100}
            font="Impact"
            fill={() => '#fff'}

          />
        </div>
        <div className="wordcloud-section">
          <h3>Western Military Reports</h3>
          <WordCloud
            data={westernWords}
            fontSizeMapper={fontSizeMapper}
            rotate={rotate}
            width={200}
            height={100}
            font="Impact"
            fill={() => '#fff'}

          />
        </div>
      </div>
    </div>
  );
}


