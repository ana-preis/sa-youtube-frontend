import './styles.css';

const CategoryContainer = () => {

    const categotyList = [
        {
            name:'Teste'
        },
        {
            name:'teste 2'
        }
    ]

    const renderCategory = (category: {name:string}) => {
        return (
            <div>{category.name}</div>
        )
    }

    return (
        <div className="category-container">
            <div className='category-title'>
                Categorias
            </div>
            <div className='flex-row'>
                <div className='category-card'>nome da categoria</div>
            </div>
        </div>
    )
}

export default CategoryContainer;