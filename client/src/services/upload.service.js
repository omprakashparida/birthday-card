import api from "./api";

export const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await api.post("/uploads/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data.imageUrl;
};

export const uploadMusic = async (file) => {
  const formData = new FormData();

  formData.append("music", file);

  const response = await api.post("/uploads/music", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log(response.data);

  return response.data.success.musicUrl;
};