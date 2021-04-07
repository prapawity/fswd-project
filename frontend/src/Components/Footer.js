
const Footer = () => {
    return (
            <footer className="block py-4 absolute w-full">
                <div className="container mx-auto px-4">
                    <hr className="mb-4 border-b-1 border-blueGray-200" />
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-4/12 px-4">
                            <div className="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">
                                Copyright © {new Date().getFullYear()}{" "} LONGTHAO
                            </div>
                    </div>
                    <div className="w-full md:w-8/12 px-4">
                        <div className="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-right">
                            About Us
                            </div>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer;