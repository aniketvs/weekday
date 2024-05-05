import { Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { filterCardData } from "../../store/slice/cardSlice";
import { store } from "../../store/store";

const SelectField = ({ option, handle ,label }) => {
  return (
    <>
      <Select options={option} onChange={handle} placeholder={label} />
    </>
  );
};

const TextInputFiled=({label,fun})=>{
    return (
        <>
           <input type="text" placeholder={label} onChange={(e)=>fun(e)} className="textfiled"/>
               </>
    )
}

export default function Header() {
  //builder that build option for select filed
  const optionBuilder = (value) => {
    return { label: value, value: value };
  };
  //options of select filed
  const role=useSelector((state)=>state.card.role)
  const Remote=["remote","on-site","hybrid"];
  const basePay=useSelector((state)=>state.card.basePay);
  const experience=useSelector((state)=>state.card.experience);
  //list to create filter
  const filterSelect =[

    {
        label:"role",
        filedType:"select",
        options:role.map((item) => optionBuilder(item)),
        gridSize:1,
        fun:(val)=>{
        store.dispatch(filterCardData({name:"jobRole",value:val.value}));
        }
    },
    {
        label:"experience",
        filedType:"select",
        options:experience.map((item)=>optionBuilder(item)),
        gridSize:1,
        fun:(val)=>{
          
        store.dispatch(filterCardData({name:"minExp",value:val.value.split(" ")[0]}));
           }
    },
    {
        label:"remote",
        filedType:"select",
        options:Remote.map((item)=>optionBuilder(item)),
        gridSize:2,
        fun:(val)=>{
          store.dispatch(filterCardData({name:"location",value:val.value}));
           }
        
    },

    {
        label:"min base pay",
        filedType:"select",
        options:basePay.map((item)=>optionBuilder(item)),
        gridSize:2,
        fun:(val)=>{
          store.dispatch(filterCardData({name:"minJdSalary",value:val.value.split(" ")[0]}));
           }
    },
    {
        label:"location",
        filedType:"text",
        gridSize:2,
        fun:(e)=>{
          store.dispatch(filterCardData({name:"location",value:e.target.value}));
           }
    },
    {
        label:"company name",
        filedType:"text",
        gridSize:2,
        fun:(e)=>{
          store.dispatch(filterCardData({name:"companyName",value:e.target.value}));
           }
    },
    {
        label:"tech stack",
        filedType:"text",
        gridSize:2,
        fun:(e)=>{
            alert("no data found in api");
           }
    },

  ];



  return (
    <>
      <Box className="header">
        <Grid container spacing={1}>
        {
            filterSelect.map((item)=>{
                return (
                    <Grid item xs={6} sm={4} md={item.gridSize}>
         { item.filedType == "select" ? <SelectField
            option={item.options}
            label={item.label}
            handle={item.fun}
            
          /> :
          <TextInputFiled label={item.label} fun={item.fun}/>}
          </Grid>
                );
            })
        }
        
        </Grid>
      </Box>
    </>
  );
}
