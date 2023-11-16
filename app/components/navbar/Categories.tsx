"use client"

import React from 'react'
import Container from '../Container'
import {BsSnow} from 'react-icons/bs'
import {FaSkiing} from 'react-icons/fa'
import {TbBeach,TbMountain, TbPool} from "react-icons/tb"
import {GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiFlake, GiForestCamp, GiIsland, GiWindmill} from "react-icons/gi"
import {MdOutlineVilla} from "react-icons/md"
import CategoryBox from "../CategoryBox"
import { usePathname, useSearchParams } from 'next/navigation'
import { BiDiamond } from 'react-icons/bi'


 export const catagories =[
    {
        label:"Beach",
        icon:TbBeach,
        description:"This place is close to the beach"
    },
    {
        label:"Windmills",
        icon:GiWindmill,
        description:"This place contains windmills "
    },
    {
        label:"Modern",
        icon:MdOutlineVilla,
        description:"This place is really Modern"
    },
    {
        label:"Mountain",
        icon:TbMountain,
        description:"This place is situated near the beautyfull CountrySide"
    },
    {
        label:"Pool",
        icon:TbPool,
        description:"This place contains Pools"
    },
    {
        label:"Island",
        icon:GiIsland,
        description:"This place is situated on the Islands"
    },
    {
        label:"Lake",
        icon:GiBoatFishing,
        description:"This place has lakes in its surroundings"
    },
    {
        label:"Skiing",
        icon:FaSkiing,
        description:"This place has cold climate and it is for skiing"
    },
    {
        label:"Castles",
        icon:GiCastle,
        description:"This place is in castle"
    },
    {
        label:"Camping",
        icon:GiForestCamp,
        description:"This place is for Camping"
    },
    {
        label:"Arctic",
        icon:BsSnow,
        description:"This place is very cold and has snow througout the year"
    },
    {
        label:"Cave",
        icon:GiCaveEntrance,
        description:"This place is in the Caves"
    },
    {
        label:"Desert",
        icon:GiCactus,
        description:"This place situated in the middle east"
    },
    {
        label:"Barn",
        icon:GiBarn,
        description:"This place situated in the Barn"
    },
    {
        label:"Luxurious",
        icon:BiDiamond,
        description:"This place is luxurious and mostly expensive"
    },
]

const Categories = () => {
    const params=useSearchParams()
    const category = params?.get('category');
    const pathname =usePathname()

    const isMainPage =pathname === '/'

if(!isMainPage){
    return null 
}

return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {catagories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );

}

export default Categories
