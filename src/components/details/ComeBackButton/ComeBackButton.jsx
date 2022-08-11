import style from './ComeBackButton.module.css';
import Link from 'next/link';
import ForwardIcon from '@material-ui/icons/Forward';
import { useRouter } from 'next/router';

export const ComeBackButton = () => {
  const router = useRouter();
  return (
    <ForwardIcon
      className={style.commeBackButton__icon}
      style={{ position: 'absolute' }}
      onClick={() => router.back()}
    />
  );
};
