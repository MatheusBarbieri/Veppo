import React from 'react'
import moment from 'moment'

export const getNextDays = (weekDay, numberDays = 10) => {
  const today = moment().isoWeekday()
  const startingDay = today <= weekDay - 1 ? weekDay : weekDay + 7

  const weekDays = []
  for (let i = 0; i < numberDays; i += 1) {
    weekDays.push(moment().isoWeekday(startingDay + 7 * i))
  }
  return weekDays
}

export const humanizeTable = (timeMin) => {
  const minutes = timeMin % 60
  const hours = (timeMin - minutes) / 60

  const hoursLabel = () => {
    if (hours === 0) return ''
    return hours + (hours === 1 ? ' hora' : ' horas')
  }

  const minsLabel = () => {
    if (minutes === 0) return ''
    return minutes + (minutes === 1 ? ' minuto' : ' minutos')
  }

  const andLabel = () => (
    minutes && hours ? (<>{' e '} <br /></>) : ''
  )

  return (
    <>
      {hoursLabel()}
      {andLabel()}
      {minsLabel()}
    </>
  )
}

export const humanizeWeekDay = (weekDay) => {
  switch (weekDay) {
    case 1:
      return 'no domingo'
    case 2:
      return 'na segunda-feira'
    case 3:
      return 'na terça-feira'
    case 4:
      return 'na quarta-feira'
    case 5:
      return 'na quinta-feira'
    case 6:
      return 'na sexta-feira'
    case 7:
      return 'no sábado'
    default:
      return ''
  }
}

export const getMonthName = (month) => {
  switch (month) {
    case 0:
      return 'Janeiro'
    case 1:
      return 'Fevereiro'
    case 2:
      return 'Março'
    case 3:
      return 'Abril'
    case 4:
      return 'Maio'
    case 5:
      return 'Junho'
    case 6:
      return 'Julho'
    case 7:
      return 'Agosto'
    case 8:
      return 'Setembro'
    case 9:
      return 'Outubro'
    case 10:
      return 'Novembro'
    case 11:
      return 'Dezembro'
    default:
      return ''
  }
}

export const humanizeDate = (date) => {
  const day = date.format('DD')
  const year = date.format('YYYY')
  const month = getMonthName(date.month())

  return `${day} de ${month} de ${year}`
}
