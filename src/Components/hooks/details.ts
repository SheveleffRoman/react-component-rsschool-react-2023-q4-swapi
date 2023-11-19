import { useDispatch } from 'react-redux';
import { useAppSelector } from './redux';
import { detailsSlice } from '../../store/reducers/DetailsSlice';
import { useNavigate } from 'react-router-dom';

export const useDetails = () => {
  const { isDetailsOpen } = useAppSelector((state) => state.detailsSlice);
  const { changeDetails } = detailsSlice.actions;
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const open = () => {
    if (!isDetailsOpen) {
      dispatch(changeDetails(true));
    }
  };

  const close = () => {
    if (isDetailsOpen) {
      dispatch(changeDetails(false));
      navigator('/');
    }
  };

  return {
    open,
    close,
  };
};
