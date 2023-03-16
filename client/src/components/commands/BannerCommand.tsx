import { Props } from 'MyModels';
import React from 'react';
import authService from '../../services/auth.service';
import { useAppSelector } from '../../store/hooks';

export function BannerCommand(props: Props) {
  const username = authService.getUsername();
  return (
    <p className="">
      <span className="block font-title text-title text-orange-300 text-center leading-normal">
        Written Kingdom
      </span>
      <span className="block mt-3 text-center text-white text-base">
        Welcome {username}! Enter 'help' to see list of available commands.
      </span>
    </p>
  );
}
