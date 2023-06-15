import { Bar } from 'react-chartjs-2';

  
  const options = {
    indexAxis: 'y',
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  
  function GroupedBar(props){
    const data = {
        labels: props.labels,
        datasets: [
          {
            label: 'Recette',
            data: props.dataRecette,
            backgroundColor: 'rgb(255, 99, 132)',
          },
          {
            label: 'Depense',
            data: props.dataDepense,
            backgroundColor: 'rgb(54, 162, 235)',
          },
          {
            label: 'Benefice',
            data: props.dataBenefice,
            backgroundColor: 'rgb(75, 192, 192)',
          },
        ],
      };
      return(
      <Bar data={data} options={options} />
      )
  };
  
  export default GroupedBar;