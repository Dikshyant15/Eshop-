// create token and saving that in cookies
const sendShopToken = (seller, statusCode, res) => {
  const sellerToken = seller.getJwtToken();

  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
  res.status(statusCode).cookie("seller_token", sellerToken, options).json({
    success: true,
    seller,
    sellerToken,
  });
};

module.exports = sendShopToken;

