// File: src/components/IccCaseMap.js
import React, { useState, useMemo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import worldTopo from 'world-atlas/countries-110m.json';
import caseData from '../data/icc_case_counts_by_country.json';
import { scaleSequential } from 'd3-scale';
import { interpolateReds } from 'd3-scale-chromatic';
import Tooltip from './Tooltip';
import './IccCaseMap.css';

export default function IccCaseMap() {
  // 1. Build lookup by exact JSON country name
  const lookup = useMemo(() => {
    const m = {};
    caseData.forEach(d => {
      m[d.Country.trim()] = {
        open:  +d.open_case_count,
        past:  +d.past_case_count,
        total: +d.total_case_count
      };
    });
    return m;
  }, []);

  // 2. Color scale
  const maxTotal = useMemo(
    () => Math.max(...caseData.map(d => +d.total_case_count), 1),
    []
  );
  const colorScale = scaleSequential([0, maxTotal], interpolateReds);

  // 3. Tooltip state
  const [tip, setTip] = useState(null);
  const handleEnter = (geo, evt) => {
    const name = geo.properties.name;
    // try direct lookup...
    let info = lookup[name];
    // ...then fallback by substring
    if (!info) {
      if (name.includes('Central African')) {
        info = lookup['Central African Republic'];
      } else if (name.includes('Congo')) {
        info = lookup['Democratic Republic of the Congo'];
      }
    }
    // default zero
    info = info || { open: 0, past: 0, total: 0 };
    setTip({
      x: evt.clientX + 10,
      y: evt.clientY + 10,
      name,
      ...info
    });
  };
  const handleLeave = () => setTip(null);

  return (
    <div className="map-container">
      <ComposableMap
        projectionConfig={{ scale: 200, center: [20, 0] }}
        style={{ width: '100%', height: '100%' }}
      >
        <Geographies geography={worldTopo}>
          {({ geographies }) =>
            geographies.map(geo => {
              const name = geo.properties.name;
              // same lookup logic for fill
              let info = lookup[name];
              if (!info) {
                if (name.includes('Central African')) {
                  info = lookup['Central African Republic'];
                } else if (name.includes('Congo')) {
                  info = lookup['Democratic Republic of the Congo'];
                }
              }
              const total = info ? info.total : 0;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={total ? colorScale(total) : '#EEE'}
                  stroke="#999"
                  onMouseEnter={evt => handleEnter(geo, evt)}
                  onMouseLeave={handleLeave}
                  style={{ outline: 'none' }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {tip && (
        <Tooltip
          x={tip.x}
          y={tip.y}
          content={{
            name: tip.name,
            open: tip.open,
            past: tip.past,
            total: tip.total
          }}
        />
      )}
    </div>
  );
}
















