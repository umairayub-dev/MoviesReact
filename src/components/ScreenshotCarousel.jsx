import React from 'react'
import { Carousel, CarouselItem } from 'react-bootstrap'

const ScreenshotCarousel = ({screenshots}) => {
    return (
        <div>
            <Carousel>
                {screenshots && screenshots.map((val, key) => (
                    <CarouselItem key={key}>
                        <img
                            className="d-block w-100"
                            style={{height: "300px"}}
                            src={val}
                            alt="Screenshot slide"
                        />
                    </CarouselItem>
                ))}
            </Carousel>
        </div>
    )
}

export default ScreenshotCarousel