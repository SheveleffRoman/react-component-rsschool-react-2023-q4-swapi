import { useDispatch } from 'react-redux';
import { useAppSelector } from './redux';
import { detailsSlice } from '../../store/reducers/DetailsSlice';
import { useRouter } from 'next/navigation';

export const useDetails = () => {
  const { isDetailsOpen } = useAppSelector((state) => state.detailsSlice);
  const { changeDetails } = detailsSlice.actions;
  const dispatch = useDispatch();
  const router = useRouter();

  const open = () => {
    if (!isDetailsOpen) {
      dispatch(changeDetails(true));
    }
  };

  const close = () => {
    if (isDetailsOpen) {
      dispatch(changeDetails(false));
      router.push('/');
    }
  };

  return {
    open,
    close,
  };
};
