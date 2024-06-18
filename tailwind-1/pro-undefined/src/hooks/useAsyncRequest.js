import { useState } from "react";
import axios from "axios";

const useAsyncRequest = (url) => {
  const [loading, setLoading] = useState(false);

  const fetchData = async (requestData) => {
    setLoading(true);

    try {
      const response = await axios.post(url, requestData);
      // Xử lý phản hồi từ máy chủ
      console.log("Response:", response.data);
      window.location.href = `${response.data.payUrl}`;
      return response.data; // Trả về dữ liệu từ phản hồi nếu cần
    } catch (error) {
      // Xử lý lỗi
      console.error("There was an error!", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, fetchData };
};

export default useAsyncRequest;
