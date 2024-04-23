import Card from './card'
import Fileupload from './fileupload'
import React from 'react'

const covid_prediciton = () => {
  return (
    <Card>
        <h2 className="text-2xl text-blue-900">Covid 19 Disease Diagonsis</h2>
				<Fileupload url="/predict-covid" />
    </Card>
  )
}

export default covid_prediciton
