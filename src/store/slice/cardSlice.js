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
      return { ...state, offset: state.offset + 1 };
    },
    saveData: (state, action) => {
      return {
        ...state,
        cardData: [...action.payload],
        previousCardData: [...action.payload],
      };
    },
    addData: (state, action) => {
      if (
        state.cardData.find((item) => item.jdUid == action.payload[0].jdUid)
      ) {
        return state;
      }
   
      return {
        ...state,
        cardData: [...state.cardData, ...action.payload],
        previousCardData: [...state.cardData, ...action.payload],
      };
    },
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
    filterCardData: (state, action) => {
      let a = new Set();
      state.filterList.map((item) => {
        a.add(item);
      });
      const existingItem = Array.from(a).find(
        (item) => item.name === action.payload.name
      );

      if (existingItem) {
        a.delete(existingItem);
      }

      a.add({ name: action.payload.name, value: action.payload.value });
      let newArr = state.previousCardData;

      let filterArr = Array.from(a);

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
