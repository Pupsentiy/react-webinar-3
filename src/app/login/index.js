import useTranslate from "../../hooks/use-translate";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import SideLayout from "../../components/side-layout";
import useSelector from "../../hooks/use-selector";
import {Navigate} from "react-router-dom";
import PageLayout from "../../components/page-layout";
import LoginForm from "../../containers/login-form";
import Text from "../../components/text";

function Login() {
  const {t} = useTranslate();

  const select = useSelector(state => ({
    user:state.user.user
  }))

  if(select.user){
    return <Navigate to={'/'}/>
  }

  return (

    <PageLayout >
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <SideLayout padding={'medium'} position={'column'} align={'start'}>
        <Text title={t("user.signIn")} headerVariant={'h2'}/>
        <LoginForm/>
      </SideLayout>
    </PageLayout>
  )
}

export default Login;