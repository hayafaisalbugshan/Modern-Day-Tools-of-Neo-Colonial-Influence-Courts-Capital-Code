import React, { useEffect } from 'react';
import * as d3 from 'd3';
import './ColonialGraph.css';

export default function ColonialGraph() {
  useEffect(() => {
    const width = 900;
    const height = 600;

    d3.select('#colonial-graph').selectAll('*').remove();

    const svg = d3.select('#colonial-graph')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(d => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-250))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide(40));

    d3.json('/data/colonial_graph_data.json').then(data => {
      const debtExtent = d3.extent(data.nodes, d => d.debt || 0);
      const radiusScale = d3.scaleSqrt().domain(debtExtent).range([10, 30]);

      const hdiExtent = d3.extent(data.nodes, d => d.hdi || 0);
      const colorScale = d3.scaleLinear()
        .domain(hdiExtent)
        .range(['#c0392b', '#27ae60']);

      const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'colonial-tooltip')
        .style('opacity', 0)
        .style('position', 'absolute');

      const link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(data.links)
        .enter().append('line')
        .attr('class', 'link-line');

      const node = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(data.nodes)
        .enter().append('circle')
        .attr('r', d => radiusScale(d.debt || 0))
        .attr('class', 'node-circle')
        .attr('fill', d => colorScale(d.hdi || 0.5))
        .call(drag(simulation))
        .on('mouseover', (event, d) => {
          tooltip.transition().duration(200).style('opacity', 1);
          tooltip
            .html(`<strong>${d.id}</strong><br/><em>${d.description || 'No description available.'}</em>`);
        })
        .on('mousemove', (event) => {
          tooltip
            .style('left', (event.pageX + 12) + 'px')
            .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', () => {
          tooltip.transition().duration(200).style('opacity', 0);
        });

      const label = svg.append('g')
        .attr('class', 'labels')
        .selectAll('text')
        .data(data.nodes)
        .enter().append('text')
        .attr('class', 'colonial-label')
        .text(d => d.id);

      simulation
        .nodes(data.nodes)
        .on('tick', () => {
          node
            .attr('cx', d => d.x = Math.max(10, Math.min(width - 10, d.x)))
            .attr('cy', d => d.y = Math.max(10, Math.min(height - 10, d.y)));

          link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

          label
            .attr('x', d => d.x)
            .attr('y', d => d.y - (radiusScale(d.debt || 0) + 6));
        });

      simulation.force('link').links(data.links);

      // Add legend
      const legend = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${width - 180}, 20)`);

      legend.append('text')
        .text('Node Color = HDI')
        .attr('y', 0)
        .style('font-size', '12px')
        .style('fill', '#f1f5f9');

      legend.append('rect')
        .attr('x', 0)
        .attr('y', 10)
        .attr('width', 100)
        .attr('height', 10)
        .style('fill', 'url(#hdi-gradient)');

      const defs = svg.append('defs');
      const gradient = defs.append('linearGradient')
        .attr('id', 'hdi-gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%');

      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#c0392b');

      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#27ae60');

      legend.append('text')
        .text('Low')
        .attr('x', 0)
        .attr('y', 35)
        .style('font-size', '10px')
        .style('fill', '#f1f5f9');

      legend.append('text')
        .text('High')
        .attr('x', 85)
        .attr('y', 35)
        .style('font-size', '10px')
        .style('fill', '#f1f5f9');

      legend.append('text')
        .text('Node Size = Debt')
        .attr('y', 60)
        .style('font-size', '12px')
        .style('fill', '#f1f5f9');
    });

    function drag(simulation) {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }
  }, []);

  return (
    <div className="colonial-section">
      <h3>Colonial Continuity Chain</h3>
      <div id="colonial-graph"></div>
    </div>
  );
}

