import { MailIcon, KeyIcon, PencilIcon, UserCircleIcon } from '@heroicons/react/solid'

const CardInfo = () => {
    return (
        <>
            <section className="relative block h-500-px">
                <div
                    className="absolute top-0 w-full h-full bg-center bg-cover"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
                    }}
                >
                    <span
                        id="blackOverlay"
                        className="w-full h-full absolute opacity-50 bg-black"
                    ></span>
                </div>
            </section>
            <section className="relatives py-16 bg-blueGray-200" style={{ paddingTop: '350px' }}>
                <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                    <div className="relative">
                                        <img
                                            alt="..."
                                            src={(process.env.PUBLIC_URL + '/img/profile-user.png')}
                                            className="shadow-xl rounded-full align-middle border-none max-w-150-px"
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-right">
                                    <div className="py-6 px-3 mt-32 sm:mt-0">
                                        <button
                                            className="bg-gray-500 active:bg-gray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-5 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                        >
                                            <div className="flex flex-wrap justify-center">
                                                <PencilIcon className="text-white-600 h-4 w-4 mr-1" />
                                                Edit
                                                </div>
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                </div>
                            </div>
                            <div className="text-center mt-12">
                                <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-4">
                                    @Username
                                    </h3>
                                <div className="mb-2 text-blueGray-600">
                                    <div className="flex flex-wrap justify-center">
                                        <UserCircleIcon className="text-gray-600 h-7 w-7 mr-2" />
                                            Name Surname
                                        </div>
                                </div>
                                <div className="mb-2 text-blueGray-600">
                                    <div className="flex flex-wrap justify-center">
                                        <MailIcon className="text-gray-600 h-7 w-7 mr-2" />
                                            Email Address: test@test.com
                                        </div>
                                </div>
                                <div className="mb-2 text-blueGray-600">
                                    <div className="flex flex-wrap justify-center">
                                        <KeyIcon className="text-gray-600 h-7 w-7 mr-2" />
                                            Password: xxxxxxxx
                                        </div>
                                </div>
                            </div>
                            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                <div className="flex flex-wrap justify-center">
                                    <h5 className="text-3xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                        Address
                                        </h5>
                                    <div className="w-full lg:w-9/12 px-4">
                                        <p className="mb-2 text-lg leading-relaxed text-blueGray-700">
                                            Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09
                                            New York, US, 15600
                                            </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default CardInfo;