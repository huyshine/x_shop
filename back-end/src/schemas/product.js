import Joi from "joi";

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  image: Joi.string(),
  description: Joi.string(),
  category: Joi.string().required(),
});

export default productSchema;
