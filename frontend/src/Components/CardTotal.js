import { TicketIcon, ReceiptTaxIcon, CreditCardIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";

const CardTotal = (props) => {
    const subTotal = props?.orderDetail?.subtotal ?? 0
    const total = props?.orderDetail?.total ?? 0
    const discount = props?.orderDetail?.promotion?.discount ?? '0'
    const shippingFee = props.orderDetail?.shippingFee ?? 100
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-6">
                <div className="px-6">
                    <div className="text-center mt-12">
                        <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                            Order Summary
                        </h3>
                        <div className="mb-2 text-blueGray-600 mt-6 text-left">
                            Subtotal: {parseFloat(subTotal).toLocaleString('th-TH', {
                                style: 'currency',
                                currency: 'THB'
                            })}
                            </div>
                        <div className="mb-2 text-blueGray-600 text-left">
                            Shipping fee: {shippingFee.toLocaleString('th-TH', {
                                style: 'currency',
                                currency: 'THB'
                            })}
                        </div>
                        <div className="mb-2 text-blueGray-600 text-left">
                            <div className="flex flex-wrap">
                                <TicketIcon className="text-white-600 h-6 w-6 mr-1" />
                            Discount: {discount}%
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 py-10 border-t border-blueGray-200 text-center">
                        <div className="mb-2 text-blueGray-600 text-left flex flex-wrap">
                            <ReceiptTaxIcon className="text-white-600 h-6 w-6 mr-1" />
                                Total: {parseFloat(total).toLocaleString('th-TH', {
                                style: 'currency',
                                currency: 'THB'
                            })}
                        </div>
                        <div className="mb-2 text-blueGray-600 text-left flex flex-wrap">
                            <CreditCardIcon className="text-white-600 h-6 w-6 mr-1" />
                                Paid by:
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}
export default CardTotal;