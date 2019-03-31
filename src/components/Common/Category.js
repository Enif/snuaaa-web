import React, { useState } from 'react';

const TAG = 'CATEGORY';

class Category extends React.Component {

    // board_id, categories, clickAll, clickCategory
    // const [selected, setSelected] = useState('all')
    constructor(props) {
        console.log(`[${TAG}] constructor`)
        super(props);

        this.state = {
            selected: undefined
        }
    }

    componentDidMount() {
        this.setState({
            selected: 'all'
        })
    }

    setSelectedCategory = (category_id) => {
        console.log(category_id)
        this.setState({
            selected: category_id
        })
    }

    makeCategories = () => {

        let selected = this.state.selected
        
        let categoryList = this.props.categories.map(category => {
            let style = {
                "border": `1px solid ${category.category_color}`
            }
            let style_selected = {
                "border": `1px solid ${category.category_color}`,
                "background-color": category.category_color,
                "color": "#eeeeee"
            }
            return (
                
                <div className="category-obj"
                key={category.category_id}
                style={selected === category.category_id ? style_selected : style}
                onClick={() => {
                    this.setSelectedCategory(category.category_id)
                    this.props.clickCategory(this.props.board_id, category.category_id)
                }}>
                    {category.category_name}
                </div>
            )
        })
        return categoryList
    }

    render() {
        let selected = this.state.selected
        let style = {
            "border": `1px solid #aaaaaa`
        }
        let style_selected = {
            "background-color": "#aaaaaa",
            "color": "#eeeeee"
        }
        return (
            <div className="category-wrapper">
                <div className="category-obj category-all"
                style={selected === 'all' ? style_selected : style}
                onClick={() => {
                    this.setSelectedCategory('all')
                    this.props.clickAll(this.props.board_id)
                }}>
                    ALL
                </div>
                {this.makeCategories()}
            </div>
        )
    }
}

export default Category;