import React from 'react'
import uid from 'uniqid'

import RoutesCell from './routes-cell'

import './stylesheets/routes-header.scss'

const rows = [
  { id: 'route', label: 'Linha' },
  { id: 'company', label: 'Empresa' },
  { id: 'mode', label: 'Modo' },
  { id: 'partTime', label: 'Hora de partida' },
  { id: 'weekDays', label: 'Frequência' },
  { id: 'price', label: 'Preço s/ seguro' },
  { id: 'priceWithInsurance', label: 'Preço c/ seguro' },
  { id: 'travelDistance', label: 'Distância' },
  { id: 'travelTime', label: 'Tempo de viagem' }
]

class RoutesHeader extends React.Component {
  render() {
    return (
      <tr className='routes-header'>
        {rows.map((row) => (
          <th key={uid('header')}>
            <RoutesCell>
              {row.label}
            </RoutesCell>
          </th>
        ))}
      </tr>
    )
  }
}

export default RoutesHeader
