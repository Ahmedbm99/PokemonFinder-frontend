import React from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'primereact/chart';

const PokemonStats = ({ pokemon }) => {
  const stats = pokemon.stats.map(stat => stat.base_stat);
  const labels = pokemon.stats.map(stat => stat.name);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: `${pokemon.name} Statistic`,
        data: stats,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 255, 255, 255)',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    scales: {
      r: {
        beginAtZero: true,
      },
    },
 
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      labels: {
        font: {color: 'gray', }, 
      },
    },
  };

  return (
    <div className="pokemon-stats-chart">
      <Chart type="radar" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
    </div>
  );
};

PokemonStats.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    stats: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        base_stat: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default PokemonStats;
