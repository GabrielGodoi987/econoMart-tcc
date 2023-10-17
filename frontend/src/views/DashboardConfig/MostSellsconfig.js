import {
    Chart,
    registerables
  } from 'chart.js'
  
Chart.register(...registerables)

export const data = {
  labels: ["Produtos mais Vendidos"],
  datasets: [
    {
      label: "teste",
      background: 'yeallow',
      data: [20]
    }
  ]
}

export const options = {
  responsive: true,
  maintainAspectRatio: false
}
