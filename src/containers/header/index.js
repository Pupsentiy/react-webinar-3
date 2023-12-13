import {Fragment, memo} from 'react';
import SideLayout from "../../components/side-layout";
import {cn as bem} from "@bem-react/classname";
import './style.css'
import {Link} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Spinner from "../../components/spinner";
import useTranslate from "../../hooks/use-translate";
function Header() {
  const {t} = useTranslate();
  const cn = bem("Header")
  const store = useStore();

  const select = useSelector(state => ({
    user: state.user.user,
    waiting:state.user.waiting
  }))

  const callbacks = {
    logout: () => {
     void store.actions.user.logout();
    },
  }

  return (
    <div className={cn()}>
      <SideLayout side={'end'}>
       <Spinner active={select.waiting}>
         {select.user ?
           <Fragment>
             <Link to={'/Profile'}>{select.user.profile.name}</Link>
             <Link to={'/login'}>
               <button className={cn('button')} onClick={callbacks.logout}>{t('user.logout')}</button>
             </Link>
           </Fragment>
           :<Link to={'/login'}>
             <button className={cn('button')}>{t('user.signIn')}</button>
           </Link>
         }
       </Spinner>
      </SideLayout>
    </div>
  );
}

export default memo(Header);
