import styles from './wrapper.module.css';
import type { FC, ReactNode } from 'react';
import classNames from 'classnames';

type Props = {
  children: ReactNode;
  className?: string;
};

export const Wrapper: FC<Props> = ({ children, className }) => {
  return (
    <div className={classNames(styles.wrapper, className)}>{children}</div>
  );
};
