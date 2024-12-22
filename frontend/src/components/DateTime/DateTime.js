import React from 'react';

export default function DateTime({
  date,
  options,
}) {
  // Thiết lập giá trị mặc định nếu options hoặc các thuộc tính bên trong bị thiếu
  const {
    weekday = 'short',
    year = 'numeric',
    month = 'long',
    day = 'numeric',
    hour = 'numeric',
    minute = 'numeric',
    second = 'numeric',
  } = options || {}; // Fallback options thành object rỗng nếu undefined

  // Kiểm tra nếu date không hợp lệ
  if (!date || isNaN(Date.parse(date))) {
    console.error('Invalid date provided:', date);
    return <div>Invalid date</div>;
  }

  // Lấy locale hiện tại
  const currentLocale = new Intl.DateTimeFormat().resolvedOptions().locale;

  // Format ngày
  const getDate = () =>
    new Intl.DateTimeFormat(currentLocale, {
      year,
      month,
      weekday,
      day,
      hour,
      minute,
      second,
    }).format(Date.parse(date));

  return <>{getDate()}</>;
}

// Giá trị mặc định cho options
DateTime.defaultProps = {
  options: {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  },
};
