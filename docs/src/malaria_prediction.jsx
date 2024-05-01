
import Card from './card'
import Fileupload from './fileupload'
import React from 'react'
const malaria_prediction = () => {
  return (
    <Card>
        <h2 className="text-2xl text-blue-900">Malaria Disease Diagonsis</h2>
				<Fileupload url="/predict-malaria" />
		</Card>
  )
}

export default malaria_prediction
