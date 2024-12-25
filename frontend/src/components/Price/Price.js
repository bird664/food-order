import React from 'react';

export default function Price({ price, locale, currency }) {
  const formatPrice = () =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(price);

  return <span>{formatPrice()}</span>;
}

// Thiết lập giá trị mặc định để hiển thị tiền Việt Nam
Price.defaultProps = {
  locale: 'vi-VN',
  currency: 'VND',
};
