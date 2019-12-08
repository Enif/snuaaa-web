import React from 'react';
import regulation from './regulation_tmp.json'
import { breakLine } from '../../utils/breakLine.js';

class Regulation extends React.Component {

    //TODO : User who is admin can be edit data.
    //TODO : convert to database from json
    makeClauseNumber = (index) => {
        switch (index) {
            case 1:
                return "①";
            case 2:
                return "②";
            case 3:
                return "③";
            case 4:
                return "④";
            case 5:
                return "⑤";
            case 6:
                return "⑥";
            case 7:
                return "⑦";
            case 8:
                return "⑧";
            case 9:
                return "⑨";
            default:
                return;
        }
    }

    makeClauseList = (clauses) => {
        if (clauses && clauses.length > 0) {
            return clauses.map((clause) => {
                return (
                    <div className="clause-wrapper">
                        <h4>{this.makeClauseNumber(clause.clause_no)}</h4>
                        <p>{breakLine(clause.text)}</p>
                    </div>
                )
            })
        }
    }

    makeArticleList = (articles) => {
        if (articles && articles.length > 0) {
            return articles.map((article) => {
                return (
                    <div className="article-wrapper">
                        <h3>제{article.article_no}조({article.article_title})</h3>
                        {this.makeClauseList(article.clauses)}
                        <h5>{breakLine(article.article_text)}</h5>
                    </div>
                )
            })
        }
    }

    makeRegulationList = () => {
        return regulation.map((chapter) => {
            return (
                <div className="chapter-wrapper" key={`ch${chapter.chapter_no}`}>
                    {
                        chapter.chapter_no ?
                        <h2>제{chapter.chapter_no}장 {chapter.chapter_title}</h2>
                        :
                        <h2>{chapter.chapter_title}</h2>
                    }
                    {this.makeArticleList(chapter.articles)}
                </div>
            )
        })
    }

    render() {
        return (

            <div className="intro-div-wrapper">
                <h3>서울대학교 아마추어 천문회 회칙</h3>
                <div className="intro-content regulation">
                    {this.makeRegulationList()}
                </div>
            </div>
        )
    }
}

export default Regulation;
