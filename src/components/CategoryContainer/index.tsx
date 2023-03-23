import './styles.css';

const CategoryContainer = () => {


    const categoryList = [
        {
            name:'Teste',
            src:"https://www.youtube.com/embed/kgx4WGK0oNU" 
        },
        {
            name:'teste 2',
            src:"https://www.youtube.com/embed/kgx4WGK0oNU" 
        }
        ,
        {
            name:'teste 3',
            src:"https://www.youtube.com/embed/kgx4WGK0oNU" 
        },
        {
            name:'teste 4',
            src:"https://www.youtube.com/embed/kgx4WGK0oNU" 
        }
    ]

    const renderCategory = (category: {name:string, src: string}) => {
        console.log(category)
        return (
            <div className="flex-column">
                <div className="category-title flex-row">
                    {category.name}
                    <button>
                        <img src="./heart.svg" alt="icon-heart" className="icon-heart"/>
                    </button>
                </div>
                <iframe className="video" src={category.src} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                <div className="video-footer flex-row">
                    <span className="video-footer-text">+ 21k views</span>
                    <button>
                        <img src="./arrow-left.svg" alt="arrow-left" className="arrow-left"/>
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-column">
            <div className="title">
                Categorias
            </div>
            <div className="category-container">
                {categoryList.map((c) => renderCategory(c))}
                
            </div>
        </div>
    )
}

export default CategoryContainer;