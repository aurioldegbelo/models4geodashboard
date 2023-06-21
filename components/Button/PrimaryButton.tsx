import classNames from 'classnames';
import React from 'react';

interface Props {
  onClick: () => void,
  className?: string,
  uppercase: boolean,
  children: React.ReactNode
}

export default function PrimaryButton(props: Props) {
  return (
    <button
      className={classNames(
        'inline-flex items-center px-4 py-2 bg-white border-2 cursor-pointer h-10 border-gray-200 rounded-md font-semibold text-xs text-indigo-900 uppercase tracking-widest hover:bg-indigo-100 focus:bg-indigo-100 active:bg-indigo-100 hover:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition ease-in-out duration-150',
        props.className,
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
