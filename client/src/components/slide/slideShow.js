import React from 'react';
import { Carousel } from 'react-bootstrap';

function Slide() {
    return (
        <div className='container-fluid' >
        <div className="row">
            <div className="col-12 p-0 slide">
                <Carousel>

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://cdn.tgdd.vn/2021/03/banner/800-170-800x170-69.png"
                            alt="First slide"
                        />
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://cdn.tgdd.vn/2021/03/banner/800-170-800x170-67.png"
                            alt="Second slide"
                        />
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://cdn.tgdd.vn/2021/03/banner/800-170-800x170-68.png"
                            alt="Third slide"
                        />
                    </Carousel.Item>

                </Carousel>
            </div>
        </div>
    </div>
    );
}

export default Slide;