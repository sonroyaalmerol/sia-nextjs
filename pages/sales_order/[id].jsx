import React from "react";
import { useRouter } from "next/router";
import { useAuthentication } from "@/hooks/useAuthentication";
import fetch from "@/utils/fetch";

let PHPesos = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'PHP',
});

const SalesOrderDetails = () => {
  const router = useRouter();
  const { tokens } = useAuthentication();
  const { id } = router.query;

  const [order, setOrder] = React.useState(null);
  const [customer, setCustomer] = React.useState(null);
  const [product, setProduct] = React.useState(null);

  // fetch transaction details
  React.useEffect(() => {
    if (!id || !tokens) {
      return;
    }
    
    fetch(`/sales_orders/${id}`, {
      headers: {
        'Authorization': `Bearer ${tokens?.access}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);

        // fetch product details
        fetch(`/product_units/${data.product_id}`, {
          headers: {
            'Authorization': `Bearer ${tokens?.access}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setProduct(data);
          })
          .catch((err) => {
            console.error(err);
          });

        // fetch customer details
        fetch(`/customer_details/${data.customer_id}`, {
          headers: {
            'Authorization': `Bearer ${tokens?.access}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setCustomer(data);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id, tokens]);

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow lg:max-w-5xl md:mt-0 sm:max-w-md xl:p-0">
        <div className="space-y-4 md:space-y-6">
          <div className="container px-4 mx-auto my-2">
            <div className="grid grid-cols-6 m-5">
              <div className="flex items-center col-span-4">
                <h4 className="mr-2">Transaction ID#</h4>
                <p className="">{order?.id}</p>
              </div>
              <div className="col-span-2 justify-self-end">
                <button className="px-3 py-2 mx-2 text-sm bg-blue-500 rounded">
                  PRINT
                </button>
                <button className="px-3 py-2 mx-2 text-sm bg-red-700 rounded" onClick={() => { router.back() }}>
                  BACK
                </button>
              </div>
              <div className="col-span-6 mb-3">
                <h3>STATUS</h3>
              </div>
              <div className="flex flex-row col-span-3">
                <div className="border-r-4 rounded-full border-[#5b1010] mr-2"></div>
                <div className="flex flex-col">
                  <div className="flex flex-row items-center justify-between">
                    <h4 className="mr-5">Order</h4>
                    <span className="bg-lime-600 text-white text-sm font-medium mr-2 px-2.5 py-1.5 rounded">
                      {order?.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <h4 className="mr-2">Shipment</h4>
                    <p className="mb-0">Pending</p>
                  </div>
                </div>
              </div>

              <div className="self-end col-span-3">
                <h3>CUSTOMER DETAILS</h3>
              </div>
              <div className="col-span-3 mt-3">
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <h4 className="">BOOKING DATE</h4>
                  <p className="">{order?.dateOrdered}</p>
                  <h4 className="">EXPECTED SHIPMENT DATE</h4>
                  <p className="">10-24-2021</p>
                </div>
              </div>
              <div className="col-span-3">
                <div className="grid grid-cols-5">
                  <h3 className="col-span-1">Name</h3>
                  <p className="col-span-4">{customer?.customerName}</p>
                  <h3 className="col-span-1">Contact</h3>
                  <p className="col-span-4">{customer?.customerContact}</p>
                  <h3 className="col-span-1">E-mail</h3>
                  <p className="col-span-4">{customer?.customerEmail}</p>
                  <h3 className="col-span-1">Address</h3>
                  <p className="col-span-4">
                    {customer?.customerAddress}
                  </p>
                </div>
              </div>
              <div className="col-span-6">
                <div class="bg-white shadow-md rounded my-6">
                  <table class="w-full table-auto">
                    <thead>
                      <tr class="bg-gray-200 text-black text-sm font-bold leading-normal">
                        <th class="py-3 px-6 text-left">Unit</th>
                        <th class="py-3 px-6 text-left">Quantity</th>
                        <th class="py-3 px-6 text-left">Amount</th>
                      </tr>
                    </thead>
                    <tbody class="text-black text-sm font-light">
                      <tr class="hover:bg-gray-100">
                        <td class="py-3 px-6 text-left whitespace-nowrap">
                          {order?.product}
                        </td>
                        <td class="py-3 px-6 text-left whitespace-nowrap">{order?.quantity}</td>
                        <td class="py-3 px-6 text-left whitespace-nowrap">
                          {PHPesos.format(order?.quantity * product?.unitPrice)}
                        </td>
                      </tr>
                      <tr class="bg-gray-200 text-black font-bold text-sm leading-normal">
                        <td class="py-3 px-6 text-left"></td>
                        <td class="py-3 px-6 text-left">Total:</td>
                        <td class="py-3 px-6 text-left whitespace-nowrap">
                          {PHPesos.format(order?.quantity * product?.unitPrice)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesOrderDetails;