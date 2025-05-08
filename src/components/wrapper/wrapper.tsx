import styles from './wrapper.module.css';
import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Wrapper: FC<Props> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
