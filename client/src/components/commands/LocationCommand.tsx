import React from 'react';
import { Props } from 'MyModels';

export function LocationCommand(props: Props) {
  const location = props.props?.location;
  console.log('location');
  return (
    <div className="">
      <p className="text-center pb-2 text-green-500">
        You are on {location.name}
      </p>
      <p className="text-center text-white">North: {location.north}</p>
      <div className="flex justify-around py-4 text-white">
        <div className="">West: {location.west}</div>
        <div className=""> East: {location.east}</div>
      </div>
      <p className="text-center text-white">South: {location.south}</p>
    </div>
  );
}
