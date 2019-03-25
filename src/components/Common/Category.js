import React from 'react';

const Category = ({ board_id, categories, clickAll, clickCategory }) => {

    const retrieveCategories = () => {
        
        let categoryList = categories.map(category => {
            console.log(category);
            let color = {
                "background-color": category.category_color
            }
            return (
                
                <div className="category-obj" onClick={() => clickCategory(board_id, category.category_id)}>
                    <div className="category-box" style={color}></div>
                    {category.category_name}
                </div>
            )
        })
        return categoryList
    } 

    return (
        <div className="category-wrapper">
            <div className="category-all" onClick={() => clickAll(board_id)}>
                ALL
            </div>
            {retrieveCategories()}
        </div>
    )
}

export default Category;