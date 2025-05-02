// File: src/components/ShutdownCostChart.js
import React, { useEffect } from 'react';
import * as d3 from 'd3';
import './ShutdownCostChart.css';

export default function ShutdownCostChart() {
  useEffect(() => {
    const width = 800;
    const height = 500;
    const margin = { top: 40, right: 30, bottom: 100, left: 80 };

    d3.select('#shutdown-cost').selectAll('*').remove();

    const svg = d3.select('#shutdown-cost')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const chart = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    d3.json('/data/shutdown_costs.json').then(data => {
      const x = d3.scaleBand()
        .domain(data.map(d => d.country))
        .range([0, width - margin.left - margin.right])
        .padding(0.2);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.cost)])
        .nice()
        .range([height - margin.top - margin.bottom, 0]);

      chart.append('g')
        .call(d3.axisLeft(y).ticks(5).tickFormat(d => `$${(d / 1e6).toFixed(1)}M`));

      chart.append('g')
        .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'rotate(-40)')
        .style('text-anchor', 'end')
        .style('font-size', '11px');

      chart.selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', d => x(d.country))
        .attr('y', d => y(d.cost))
        .attr('width', x.bandwidth())
        .attr('height', d => y(0) - y(d.cost))
        .attr('fill', '#e74c3c')
        .on('mouseover', function (event, d) {
          d3.select(this).attr('fill', '#c0392b');
          tooltip.transition().duration(200).style('opacity', 1);
          tooltip.html(`<strong>${d.country}</strong><br/>$${d.cost.toLocaleString()}`)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', function () {
          d3.select(this).attr('fill', '#e74c3c');
          tooltip.transition().duration(200).style('opacity', 0);
        });
    });

    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'shutdown-tooltip')
      .style('opacity', 0)
      .style('position', 'absolute');
  }, []);

  return (
    <div className="shutdown-section">
      <h3>Economic Cost of Internet Shutdowns</h3>
      <div id="shutdown-cost"></div>
    </div>
  );
}
