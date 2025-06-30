// ______________________________________________________

// ____________________________________________________________/

const ROOTS = {
  DASHBOARD: "/dashboard",
  AUTH: "/auth",
};

export const paths = {
   auth: {
      Form: `${ROOTS.AUTH}`,
  },
  dashboard: {
    product: {
      root: `${ROOTS.DASHBOARD}`,
      Form: `${ROOTS.DASHBOARD}/`,
      checkout: (id: string)=>`${ROOTS.DASHBOARD}/product/checkout/${id}`,
      details:  (id: string)=>`${ROOTS.DASHBOARD}/product/product-details/${id}`,
      addproduct:`${ROOTS.DASHBOARD}/product/addproduct`
    },
  },
};

