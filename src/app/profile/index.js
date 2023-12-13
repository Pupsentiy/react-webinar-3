import {memo} from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import PageLayout from "../../components/page-layout";
import LocaleSelect from "../../containers/locale-select";
import Head from "../../components/head";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import UserCard from "../../components/user-card";
import Text from "../../components/text";
import SideLayout from "../../components/side-layout";
import {Navigate} from "react-router-dom";
import Spinner from "../../components/spinner";


function Profile(){
  const {t} = useTranslate();
  const store = useStore();
  const token = window.localStorage.getItem('token')

 useInit(() =>{
  void store.actions.user.userDetails()
 } ,[])

  const select = useSelector(state => ({
    user: state.user.user,
    waiting:state.user.waiting
  }))

  if (!token) {
    return <Navigate to={"/login"}/>;
  }

  return(
    <PageLayout>
      <Head title={t("title")}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
     <SideLayout padding={'medium'} position={'column'} align={'start'}>
       <Text title={t('user.profile')} headerVariant={'h2'}/>
       <UserCard user={select.user}/>
     </SideLayout>
      </Spinner>
    </PageLayout>
  )
}

export default memo(Profile)
