import {memo, useState} from "react";
import {cn as bem} from "@bem-react/classname";
import Input from "../../components/input";
import './style.css'
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Text from "../../components/text";
import useTranslate from "../../hooks/use-translate";
function LoginForm () {
  const {t} = useTranslate();
  const store = useStore();
  const cn = bem("LoginForm");
  const [data, setData] = useState({login:'test_1',password:'123456'})

  const setValueInput = (value, name) => {
    setData({...data, [name]:value})
  }

  const select = useSelector(state => ({
    error: state.user.error
  }))

  const handleSubmit = (e) => {
    e.preventDefault();
    void store.actions.user.login(data);
  };

  return(
    <div className={cn()}>
      <form className={cn('form')} onSubmit={handleSubmit}>
        <Input
          name='login'
          type={'text'}
          delay={0}
          value={data.login}
          label={t('user.login')}
          onChange={setValueInput}
        />
        <Input
          name='password'
          type={'password'}
          delay={0}
          value={data.password}
          label={t('user.password')}
          onChange={setValueInput}
        />
        {<Text color={'error'} text={select.error}/>}
        <button className={cn('login')} type='submit'>
          {t("user.enter")}
        </button>
      </form>
    </div>
  )
}

export default memo(LoginForm)