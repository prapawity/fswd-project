import { SparklesIcon } from "@heroicons/react/solid"

const Home = () => {
    return (
        <main>
            <div className="relative pb-25 flex content-center items-center justify-center min-h-screen-75">
                <img
                    src={(process.env.PUBLIC_URL + '/img/Banner2.jpeg')}
                    alt="..."
                />
            </div>

            <div className="relative pt-10 pb-32 flex content-center items-center justify-center min-h-screen-75">
                <div className="items-center flex flex-wrap">
                    <div className="w-full md:w-4/12 ml-auto mr-10 px-4">
                        <img
                            alt="..."
                            className="max-w-full rounded-lg shadow-lg"
                            src={(process.env.PUBLIC_URL + '/img/sale.png')}
                        />
                    </div>
                    <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                        <div className="md:pr-12">
                            <div className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-300">
                                <SparklesIcon className="h-7 w-7 text-white-500" />
                            </div>
                            <h3 className="text-3xl font-semibold">Lastest Products</h3>
                            <div className="flex flex-wrap">
                                <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                        <div className="px-4 py-5 flex-auto">
                                            <img
                                                alt="..."
                                                src={(process.env.PUBLIC_URL + '/img/shoes/casual1.jpeg')}
                                                className="shadow-lg rounded-full mx-auto max-w-120-px"
                                            />
                                            <div className="pt-6 text-center">
                                                <h5 className="text-xl font-bold">Nike Ryz 365 2</h5>
                                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-gray-600 bg-gray-200 uppercase last:mr-0 mr-1">
                                                    Casual
                                                    </span>
                                                <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                                                    ฿3,100
                                                    </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                        <div className="px-4 py-5 flex-auto">
                                            <img
                                                alt="..."
                                                src={(process.env.PUBLIC_URL + '/img/shoes/run3.jpeg')}
                                                className="shadow-lg rounded-full mx-auto max-w-120-px"
                                            />
                                            <div className="pt-6 text-center">
                                                <h5 className="text-xl font-bold">Nike Joyride Run Flyknit</h5>
                                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-gray-600 bg-gray-200 uppercase last:mr-0 mr-1">
                                                    Running
                                                    </span>
                                                <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                                                    ฿6,100
                                                    </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                        <div className="px-4 py-5 flex-auto">
                                            <img
                                                alt="..."
                                                src={(process.env.PUBLIC_URL + '/img/shoes/sandal2.jpeg')}
                                                className="shadow-lg rounded-full mx-auto max-w-120-px"
                                            />
                                            <div className="pt-6 text-center">
                                                <h5 className="text-xl font-bold">Nike Offcourt</h5>
                                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-gray-600 bg-gray-200 uppercase last:mr-0 mr-1">
                                                    Sandals
                                                    </span>
                                                <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                                                    ฿1,300
                                                    </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default Home