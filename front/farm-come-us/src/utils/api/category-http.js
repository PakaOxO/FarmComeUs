import axios from "axios";

export async function categoryTitle() {
  try {
    const response = await axios({
      method: "get",
      url: "api/api/v1/item/title",
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function categoryDetail(titleName) {
  try {
    const response = await axios({
      method: "get",
      url: "api/api/v1/item/detail",
      params: {
        titleName: titleName,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
