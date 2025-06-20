import api from "../core/api";

// Lấy danh sách tất cả category
export const submitJobApplication = async (formData:any) => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("position", formData.position);
    data.append("file", formData.file);
  
    const response = await api.post("/apply", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  
    return response.data;
  };