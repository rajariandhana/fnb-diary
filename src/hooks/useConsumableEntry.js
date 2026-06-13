import { useState, useContext, createContext } from "react";

const DEFAULT_CONSUMABLE_TYPE = "food";
const DEFAULT_SOURCE_TYPE = "homemade";

const ConsumableTypeContext = createContext();

// function useConsumableEntryForm() {
//   const [consumableType, setConsumableType] = useState(DEFAULT_CONSUMABLE_TYPE);

//   return {
//     consumableType,
//     setConsumableType,
//   };
// }

export { DEFAULT_CONSUMABLE_TYPE, DEFAULT_SOURCE_TYPE, ConsumableTypeContext };
