import { createSlice } from "@reduxjs/toolkit";

const intitalState = {
  cardData: [],
  previousCardData: [],
  role: [],
  experience: [],
  basePay: [],
  filterList: [],
  offset: 0,
};
const cardSlice = createSlice({
  name: "card",
  initialState: intitalState,
  reducers: {
    setOffset: (state, action) => {
      return { ...state, offset: state.offset + 1 };  //to change offset value
    },
    saveData: (state, action) => {
      return {
        ...state,
        cardData: [...action.payload],//to store updated data
        previousCardData: [...action.payload], //to store all data that fetch previously
      };
    },
    addData: (state, action) => {
      if (
        state.cardData.find((item) => item.jdUid == action.payload[0].jdUid) //to avoid duplicate value
      ) {
        return state;
      }
   
      return {
        ...state,
        cardData: [...state.cardData, ...action.payload],   //add more data during infinite scroll
        previousCardData: [...state.cardData, ...action.payload],
      };
    },
    //role,experience ,basepay,etc. options are fetch from these function
    getRole: (state, action) => {
      let s = new Set();
      state.cardData.map((item) => {
        s.add(item.jobRole);
      });

      return {
        ...state,
        role: Array.from(s),
      };
    },
    getExp: (state, action) => {
      let s = new Set();
      state.cardData.map((item) => {
        if (item.minExp == null) {
          s.add("fresher");
          return;
        }
        s.add(`${item.minExp} year`);
      });

      return {
        ...state,
        experience: Array.from(s),
      };
    },
    getBasePay: (state, action) => {
      let s = new Set();
      state.cardData.map((item) => {
        if (item.minJdSalary == null) return;
        s.add(`${item.minJdSalary} LPA`);
      });

      return {
        ...state,
        basePay: Array.from(s),
      };
    },
    //filter function that return filter value
    filterCardData: (state, action) => {
      let a = new Set();
      state.filterList.map((item) => {
        a.add(item);
      });
      const existingItem = Array.from(a).find(
        (item) => item.name === action.payload.name
      );

      if (existingItem) {
        a.delete(existingItem); //if name exist then delete it to update new value
      }

      a.add({ name: action.payload.name, value: action.payload.value });
      let newArr = state.previousCardData;

      let filterArr = Array.from(a);
//to apply all filter 
      for (let c of filterArr) {
        if (c.name == "location" || c.name == "companyName") {
          newArr = newArr.filter((item) =>
            item[c.name].toLowerCase().includes(c.value.toLowerCase())
          );
          continue;
        }
        newArr = newArr.filter((item) => item[c.name] == c.value);
      }

      return {
        ...state,
        cardData: newArr,
        filterList: filterArr,
      };
    },
  },
});

export default cardSlice.reducer;
export const {
  saveData,
  addData,
  getRole,
  getExp,
  getBasePay,
  filterCardData,
  setOffset,
} = cardSlice.actions;
