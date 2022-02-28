const deleteProduct = async (btn) => {
  console.dir(btn);
  console.dir(btn.parentNode.querySelector('[name="_csrf"]').value);
  const csrfToken = btn.parentNode.querySelector('[name="_csrf"]').value;
  const productID = btn.parentNode.querySelector('[name="productId"]').value;

  const result = await fetch(`/admin/product-list/${productID}`, {
    method: "DELETE",
    headers: {
      "csrf-token": csrfToken,
    },
  });

  const data = await result.json();

  console.log({ data });

  if (data.message === "Success") {
    const productCard = btn.closest("article");
    console.log({ productCard });
    productCard.remove();
  }

  console.log({ result });
};
