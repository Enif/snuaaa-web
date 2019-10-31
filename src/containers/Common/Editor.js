import React from 'react';
import ReactQuill from 'react-quill';
import * as service from 'services';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

class Editor extends React.Component {

    constructor(props) {
        super(props);

        this.modules = {
            toolbar: {
                container: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                    ['link', 'image', 'video']
                ],
                handlers: {
                    image: function () {
                        const input = document.createElement('input');

                        input.setAttribute('type', 'file');
                        input.setAttribute('accept', 'image/*');
                        input.click();

                        input.onchange = async () => {
                            const file = input.files[0];
                            const formData = new FormData();

                            formData.append('attachedImage', file);

                            // Save current cursor state
                            const range = this.quill.getSelection(true);

                            // Insert temporary loading placeholder image
                            // this.quill.insertEmbed(range.index, 'image', `${ window.location.origin }/images/loaders/placeholder.gif`); 

                            // Move cursor to right side of image (easier to continue typing)
                            // this.quill.setSelection(range.index + 1);

                            const res = await service.createAttachedImage(formData); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
                            // this.quill.deleteText(range.index, 1);
                            this.quill.insertEmbed(range.index, 'image', SERVER_URL + 'static' + res.data.imgPath);
                        }
                    }
                }
            }
        }
        this.formats = [
            'header',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'video', 'image'
        ]

    }

    render() {

        const { text, editText } = this.props;

        return (
            <ReactQuill
                className="writepost-quill"
                value={text}
                onChange={editText}
                modules={this.modules}
                formats={this.formats} />
        )
    }
}
export default Editor;
