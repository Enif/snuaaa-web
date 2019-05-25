import React from 'react';
import * as service from '../../services';
import Loading from '../../components/Common/Loading';
import SelectBox from '../../components/Common/SelectBox';
import DocuMenu from '../../components/Document/DocuMenu';
import DocuList from '../../components/Document/DocuList';
import CreateDocu from '../../components/Document/CreateDocu';
import Category from '../../components/Common/Category';

const TAG = 'DOCUMENT'

class DocuBoard extends React.Component {

    constructor(props) {
        super(props);
        this.documents = [];
        this.state = {
            isDocuListReady: false,
            popUpState: false,
            category: null,
            generation: 0
        }
    }

    componentDidMount() {
        this.fetch();
    }

    fetch = async() => {
        console.log(this.state.category)
        console.log(this.state.generation)
        this.setState({
            isDocuListReady: false
        })
        await service.retrieveDocuments(this.state.category, this.state.generation)
        .then((res) => {
            this.documents = res.data;
            this.setState({
                isDocuListReady: true
            })
        })
        .catch((err) => {
            console.error(err)
        })
    }

    retrieveDocumentsByGeneration = async(generation) => {
        this.setState({
            isDocuListReady: false
        })
        await service.retrieveDocumentsByGeneration(generation)
        .then((res) => {
            this.documents = res.data;
            this.setState({
                isDocuListReady: true
            })
        })
        .catch((err) => {
            console.error(err)
        })
    }

    togglePopUp = () => {
        this.setState({
            popUpState: !this.state.popUpState
        })
    }

    clickCategory = (ctg_id) => {
        this.setState({
            selectedCategory: ctg_id
        },
        this.fetch
        )
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        },
        this.fetch
        )
    }

    render() {

        const { board_id, categories } = this.props;
        const { isDocuListReady, selectedCategory } = this.state;

        const categoryOptions = categories.map((category) => {
            return {
                id: category.category_id,
                name: category.category_name
            }
        });
        const generationOptions = [];
        let currentGen = 2 * ((new Date()).getFullYear() - 1980)
        for (let i = currentGen; i > 0; i--) {
            generationOptions.push({
                id: i,
                name: i + '대'
            });
        }

        return(
            <div className="board-wrapper">
                <h2>문서게시판</h2>
                {/* <Category categories={categories} selected={selectedCategory} clickCategory={this.clickCategory} /> */}
                <SelectBox selectName="category" optionList={categoryOptions} onSelect={this.handleChange}/>
                <SelectBox selectName="generation" optionList={generationOptions} onSelect={this.handleChange}/>
                {/* <DocuMenu retrieveDocumentsByGeneration={this.retrieveDocumentsByGeneration} /> */}
                {(() => {
                    if(isDocuListReady) {
                        return(
                            <>
                                <DocuList documents={this.documents} />
                                <button className="enif-btn-circle enif-pos-sticky" onClick={() => this.togglePopUp()}>
                                    <i className="material-icons">note_add</i>
                                </button>
                                {
                                    this.state.popUpState && <CreateDocu board_id={board_id} retrieveDocuments={this.retrieveDocuments} categories={categories} togglePopUp={this.togglePopUp} />
                                }
                            </>           
                        )
                    }
                    else {
                        return(
                            <Loading />
                        )
                    }
                })()}
            </div>
        )
    }
}

export default DocuBoard;