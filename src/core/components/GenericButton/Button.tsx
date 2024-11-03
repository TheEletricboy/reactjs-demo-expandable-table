import classNames from "classnames";
import React, { memo, SyntheticEvent, useCallback } from "react";
import './Button.scss';

type TButtonProps = {
  label?: string,
  isInverse?: boolean,
  isPrimary?: boolean; // could add secondary and tertiary in the future :D
  title?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: (event: SyntheticEvent) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>

/**
 * A generic button component with a certain amount of customization. Including something like JSX.
 */
const Button = ({
  label,
  isPrimary = true,
  onClick,
  title,
  children,
  isInverse,
  className,
  ...otherProps
}: TButtonProps) => {
  // Useful if you need to handle the event in another place, by passing it as an arg on the callback.
  const handleOnClick = useCallback((event: SyntheticEvent) => onClick?.(event), [onClick]);
  return (
    <button
      className={classNames(
        'generic-button',
        { ['primary']: isPrimary },
        { 'inverse': isInverse },
        className,
      )}
      onClick={handleOnClick}
      title={title}
      {...otherProps}
    >
      <span className={'label'}>{label ?? ''}</span>
      {children}
    </button>
  );
};

export default memo(Button);
