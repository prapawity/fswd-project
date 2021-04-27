import Carousel, { autoplayPlugin } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'

const CarouselComponent = (props) => {
    return (
        <div className="relative pt-0 pb-25 flex content-center items-center justify-center min-h-screen-75">
            <Carousel
                plugins={[
                    'infinite',
                    {
                        resolve: autoplayPlugin,
                        options: {
                            interval: 3000,
                        }
                    },
                ]}
                animationSpeed={1000}
            >
                {props.children}
            </Carousel>
        </div>
    )
}

export default CarouselComponent