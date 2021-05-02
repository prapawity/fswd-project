import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CardPayment from "../Components/Payment/CardPayment";
import CardSum from "../Components/Payment/CardSum";
import { useSession } from "../contexts/SessionContext";
import { PRODUCTS_QUERY } from "../graphql/productQuery";
import { PROMOTIONS_QUERY } from "../graphql/promotionQuery";

const CustomerPayment = (props) => {
  const history = useHistory();
  const { cart, setLoading } = useSession();
  const [newOrder, setNewOrder] = useState(props?.location?.state?.newOrder ?? undefined)
  const { loading: prodLoad, data: productsQuery, refetch: refetchProd } = useQuery(PRODUCTS_QUERY)
  const { loading: promoLoad, data: promotionsQuery, refetch: refetchPromo } = useQuery(PROMOTIONS_QUERY)
  const [userStock, setStk] = useState([])
  const showLoading = (show) => {
    setLoading(show)
  }
  let stock = []
  let dataShow = [];

  if (props?.location?.state?.newOrder === undefined) {
    history.push("/customer/checkout");
  }

  useEffect(() => {
    if (newOrder === undefined) {
      history.push("/customer/checkout");
    }
  }, [newOrder])

  const calculateContent = () => {
    dataShow = [];
    cart?.map((prod) => {
      let inData = false;
      inData =
        dataShow?.filter(
          (dataProd) => dataProd?.id === prod?.id && dataProd?.size === prod?.size
        ).length === 0;
      if (inData) {
        dataShow?.push(prod);
      }
    });
  };
  calculateContent();

  const refetchData = () => {
    refetchProd()
    refetchPromo()
  }

  const updateData = useCallback(() => {
    stock = []
    cart?.map((prod) => {
      let prodInStock = stock?.filter((prodInStock) => {
        if (prodInStock.type === "PROMOTION") {
          return prod?.id === prodInStock?.id
        } else {
          return prod?.id === prodInStock?.id
        }
      })

      let newProdInStock = {}
      if (prodInStock.length !== 0) {
        if (prodInStock[0].type === "PROMOTION") {
          prodInStock[0].qualtity -= 1
        }
        const mockSize = []
        prodInStock[0]?.size?.map((size, index) => {
          if (size?.size_number === prod?.size) {
            mockSize.push({ stock: prodInStock[0].size[index].stock - 1, size_number: size?.size_number, _id: size?._id })
          } else {
            mockSize.push(size)
          }
        })
        prodInStock[0].size = mockSize

      } else {
        const prodList = productsQuery?.products?.filter((product) => product?._id === prod?.id) ?? []
        const promoList = promotionsQuery?.promotions?.filter((promo) => promo?._id === prod?.id) ?? []
        if (prod?.type === "PROMOTION") {

          const size = []
          promoList[0]?.productDetail?.size?.map((num) => {
            if (num.size_number === prod?.size) {

              size.push({ _id: promoList[0]?._id, size_number: num?.size_number, stock: parseInt(parseInt(num.stock) - 1) })
            } else {
              size.push(num)
            }
          })
          newProdInStock = { id: prod?.id, size: size, qualtity: parseInt(parseInt(promoList[0]?.limit ?? 0) - 1), type: "PROMOTION", productDetail: promoList[0]?.productDetail }
        } else if (prod?.type === "PRODUCT") {
          const size = []

          prodList[0]?.size?.map((num) => {
            if (num.size_number === prod?.size) {

              size.push({ _id: num?._id, size_number: num?.size_number, stock: parseInt(parseInt(num.stock) - 1) })
            } else {
              size.push(num)
            }
          })
          newProdInStock = { id: prod?.id, size: size, type: "PRODUCT" }
        }
        stock.push(newProdInStock)
      }

      setStk(stock)
    })
  }, [stock])

  useEffect(() => {
    updateData()

    if (promoLoad || prodLoad) {
      setLoading(true)
    } else if (!prodLoad && !promoLoad) {
      setLoading(false)
    }
  }, [productsQuery, promotionsQuery, promoLoad, prodLoad])

  if (stock.length === 0 && userStock.length === 0 && promotionsQuery === undefined || productsQuery === undefined) {
    refetchData()
  }
  const getStock = () => userStock.length === 0 ? stock : userStock

  const CARD_CONTENT = (stockCheck) => {
    const id = Math.floor(Date.now() / 1000)
    return <CardSum key={id} setShowLoading={showLoading} type="Payment" newOrder={newOrder} stock={stock} getStock={getStock} />
  }

  return (
    <div className="flex flex-wrap">
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mt-6">
        <CardPayment />
      </div>
      <div className="w-full xl:w-4/12 px-4" hidden={(userStock?.length ?? 0) === 0}>
        {CARD_CONTENT(userStock ?? stock)}
      </div>
    </div>
  );
}

export default CustomerPayment;
