import React from 'react'
import Card from 'react-bootstrap/Card'

const CardDieta = ({item}) => {
    console.log(item)
    return (
        <Card
            className="item-card"
            style={{ cursor: 'pointer' }}
        >
            <Card.Img src={item.image} alt={item.name} />
            <Card.Body>
                <h5>{item.name}</h5>
            </Card.Body>
        </Card>
    )
}

export default CardDieta
