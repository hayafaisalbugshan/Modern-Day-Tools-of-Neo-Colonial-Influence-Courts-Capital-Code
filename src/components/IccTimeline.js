// File: src/components/IccTimeline.js
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import './IccTimeline.css';

export default function IccTimeline() {
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.json('/data/icc_timeline_data.json').then(setData);
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const margin = { top: 40, right: 20, bottom: 50, left: 20 };
    const width = window.innerWidth - margin.left - margin.right;
    const height = 300;

    d3.select('#timeline').selectAll('*').remove();

    const svg = d3
      .select('#timeline')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const years = [...new Set(data.map(d => d.year))];
    const xScale = d3
      .scalePoint()
      .domain(years.sort((a, b) => a - b))
      .range([0, width])
      .padding(0.5);

    svg
      .append('g')
      .attr('transform', `translate(0,${height / 2})`)
      .call(d3.axisBottom(xScale).tickSize(0))
      .selectAll('text')
      .attr('dy', '4.5em'); // or try '3em' if needed

    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'timeline-tooltip')
      .style('opacity', 0)
      .style('position', 'absolute');

      svg
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.year))
      .attr('cy', (d, i) => height / 2 + (d.type === 'ICC' ? -18 : 18))
      .attr('r', 8)
      .attr('fill', d => (d.type === 'ICC' ? '#f43f5e' : '#60a5fa')) // rose red vs bright blue
      .on('mouseover', function (event, d) {
        d3.select(this)
          .transition()
          .duration(150)
          .attr('r', 12);
        
        tooltip
          .style('opacity', 1)
          .html(`<strong>${d.year}:</strong> ${d.event}<br/><em>${d.description}</em>`);
      })
      .on('mousemove', function (event) {
        tooltip
          .style('left', event.pageX + 15 + 'px')
          .style('top', event.pageY - 40 + 'px');
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(150)
          .attr('r', 8);
    
        tooltip.style('opacity', 0);
      });
    
  }, [data]);

  return (
    <div className="timeline-container">
      <h3>ICC Prosecutions vs Major Global Events</h3>
      <div id="timeline"></div>
      <div className="timeline-legend">
        <span className="dot icc" /> ICC
        <span className="dot world" /> World
      </div>
    </div>
  );
}




