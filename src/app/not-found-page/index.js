import PageLayout from "../../components/page-layout";
import {Link} from "react-router-dom";
import useSelector from "../../store/use-selector";
import {changeLang} from "../../utils";
import './style.css'
function NotFoundPage() {
  const select = useSelector(state => ({
    toggleLang:state.toggleLang.toggle
  }));

  return (
    <PageLayout>
      <div className="NotFoundPage">
        <h1>{changeLang(select.toggleLang,'Страница не найдена')}</h1>
        <Link className='NotFoundPage-link' to={'/'}>{changeLang(select.toggleLang,'На главную')}</Link>
      </div>
    </PageLayout>);
}

export default NotFoundPage;