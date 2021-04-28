import React from "react";

const CardPayment = () => {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-700 text-2xl font-bold">Payment</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <div className="flex flex-wrap align-center">
              {/* <input
                type="radio"
                class="form-radio rounded border-0 mt-4 mb-6 mr-1"
              /> */}
              <h6 className="text-gray-500 text-lg mt-3 mb-6 font-bold uppercase">
                Credit/Debit Card
              </h6>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-600 text-xs font-bold mb-2"
                  >
                    Card Number
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-gray-200 text-gray-300 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Card Number"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-600 text-xs font-bold mb-2"
                  >
                    Name on Card
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-gray-200 text-gray-300 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Name on Card"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-600 text-xs font-bold mb-2"
                  >
                    Expiration date
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-gray-200 text-gray-300 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="MM/YY"
                  />
                </div>
              </div>
              <div className="w-full lg:w-2/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-600 text-xs font-bold mb-2"
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-gray-200 text-gray-300 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="CVV"
                  />
                </div>
              </div>
            </div>
            {/* <hr className="mt-6 border-b-1 border-gray-300" /> */}
          </form>
        </div>
      </div>
    </>
  );
};
export default CardPayment;
