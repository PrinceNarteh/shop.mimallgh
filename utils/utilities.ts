export const capitalize = (word: string) => {
  if (word === "knh") return word.toUpperCase();

  return word
    .split("_")
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ");
};

export const convertBase64 = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };
  });
};

export const parseProductImageUrl = (imageName: string) => {
  return `https://api.mimallgh.com/products/image/${imageName}`;
};

export const parseShopImageUrl = (imageName: string) => {
  return `https://api.mimallgh.com/shops/image/${imageName}`;
};
