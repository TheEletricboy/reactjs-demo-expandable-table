import classNames from "classnames";
import { memo, SyntheticEvent, useCallback } from "react";
import './Button.scss';

type TButtonProps = {
  label?: string,
  isPrimary?: boolean; // could add secondary and tertiary in the future :D
  title?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: (event: SyntheticEvent) => void;
}

/**
 * A generic button component with a certain amount of customization. Including something like JSX.
 */
const Button = ({
  label,
  isPrimary = true,
  onClick,
  title,
  children,
  className,
  ...otherProps
}: TButtonProps) => {
  // Useful if you need to handle the event in another place, by passing it as an arg on the callback.
  const handleOnClick = useCallback((event: SyntheticEvent) => onClick?.(event), []);
  return (
    <button
      className={classNames('generic-button', { ['primary']: isPrimary }, className)}
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
