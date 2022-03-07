import {Rate} from "../../single-dish/dish-review/rate";

export interface Dish {
  key ?: string,
  id ?: number;
  name : string;
  cuisine : string[];
  category : string[];
  ingredients : string[];
  maxPerDay : number;
  price : number;
  description : string;
  photoURLs : string[];
  rate : number;
  reviews : Rate[]
}
