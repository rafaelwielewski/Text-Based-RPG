import React from 'react';
import { Props } from 'MyModels';
import { selectLocation } from '../features/data/locationSlice';
import { useAppSelector } from '../store/hooks';

export function Map() {
  const location = useAppSelector(selectLocation);

  return (
    <div className="">
      <p className="text-center pb-2 text-green-500">
        You are on {location.name}
      </p>
      <p className="text-center text-white">
        North:<p>{location.north}</p>
      </p>
      <div className="flex justify-around py-4 text-white">
        <div className="text-center">
          West: <p>{location.west}</p>
        </div>
        <div className="text-center break-words">
          {' '}
          East: <p className="">{location.east}</p>
        </div>
      </div>
      <p className="text-center text-white">
        South: <p>{location.south}</p>
      </p>
    </div>
  );
}
