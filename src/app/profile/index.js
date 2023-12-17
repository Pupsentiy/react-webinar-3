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
import Spinner from "../../components/spinner";


function Profile(){
  const {t} = useTranslate();
  const store = useStore();

  const select = useSelector(state => ({
    user: state.userDetails.user,
    token: state.user.token,
    waiting:state.user.waiting,
  }))

  useInit(() =>{
    if(!select.user){
      void store.actions.userDetails.userDetails(select.token)
    }
  } ,[])

  return(
    <PageLayout>
      <Head title={t("title")}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
     <SideLayout padding={'medium'} position={'column'} align={'start'}>
       <Text title={t('user.profile')} headerVariant={'h2'}/>
       <UserCard user={select.user} t={t}/>
     </SideLayout>
      </Spinner>
    </PageLayout>
  )
}

export default memo(Profile)
