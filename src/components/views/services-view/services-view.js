import React, { Component } from 'react'

import ServicesSection from '../../services-section'

import './stylesheets/services-view.scss'

import onibus from '../images/onibus.jpg'
import passagensOnline from '../images/passagens-online.jpg'
import passagensInternacionais from '../images/passagens-internacionais.jpg'
import mapa from '../images/mapa.jpg'
import postosDeVenda from '../images/postos-de-venda.jpg'
import encomendas from '../images/encomendas.jpg'
import correios from '../images/correios.jpg'
import guiche from '../images/guiche.jpg'
import guardaMalas from '../images/guarda-malas.jpg'
import telefones from '../images/telefones.jpg'

const homeServices = [
  {
    title: 'Horários de Ônibus',
    description: 'Horários de ônibus',
    image: onibus,
    slug: 'horarios'
  },
  {
    title: 'Mapa e Estrutura',
    description: 'Mapa e Estrutura',
    image: mapa,
    slug: 'mapa-e-estrutura'
  },
  {
    title: 'Postos de Venda',
    description: 'Postos de Venda',
    image: postosDeVenda,
    slug: 'postos-de-venda'
  },
  {
    title: 'Encomendas',
    description: 'Encomendas',
    image: encomendas,
    slug: 'encomendas'
  },
  {
    title: 'Comprar Passagens Online',
    description: 'Comprar passagens',
    image: passagensOnline,
    slug: 'passagens'
  },
  {
    title: 'Guichês 24 Horas',
    description: 'Guichês 24 horas',
    image: guiche,
    slug: 'guiche'
  },
  {
    title: 'Agência dos Correios',
    description: 'Agencia dos Correios',
    image: correios,
    slug: 'correios'
  },
  {
    title: 'Guarda Malas',
    description: 'Guarda Malas',
    image: guardaMalas,
    slug: 'guarda-malas'
  },
  {
    title: 'Telefones',
    description: 'Telefones',
    image: telefones,
    slug: 'telefones'
  },
  {
    title: 'Passagens Interestaduais e Internacionais',
    description: 'Passagens Interestaduais e Internacionais',
    image: passagensInternacionais,
    slug: 'passagens-internacionais'
  }
]

export default class ServicesView extends Component {
  render() {
    return (
      <div className='services-view'>
        <ServicesSection services={homeServices} />
      </div>
    )
  }
}
