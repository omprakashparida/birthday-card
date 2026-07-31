import { nanoid } from "nanoid";

const generateSlug = () => {
  return nanoid(8);
};

export default generateSlug;