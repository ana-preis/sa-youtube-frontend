import { Link } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import './styles.css'

const DynamicUserBreadcrumb = (username: string) => (
  <span>{username}</span>
);

interface BreadcrumbsProps {
  className?: string;
  breadcrumbPage?: string;
}

const Breadcrumbs = (props: BreadcrumbsProps) => {
  
  const { className, breadcrumbPage } = props

  const routes = [
    { path: "/users/:userId", breadcrumb: "Meu Perfil" },
    { path: "/users", breadcrumb: null },
    // ajustar a pagina de lista de categorias
    { path: "/categories", breadcrumb: "Categorias" },
    { path: "/categories/:categoryID", breadcrumb: breadcrumbPage }
  ];

  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <nav className={className}>
      {breadcrumbs.map(({ match, breadcrumb }) => (
        <Link 
        key={match.pathname} 
        to={match.pathname}
        className={match.pathname === location.pathname ? "breadcrumb-active" : "breadcrumb-not-active"}
        >
          <span className="breadcrumb-font breadcrumb-under">{breadcrumb}{match.pathname !== location.pathname && <span> / </span>} </span>
        </Link>
      ))}
    </nav>
  );
}

export default Breadcrumbs;