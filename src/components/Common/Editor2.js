import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import * as service from '../../services/index';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Link from '@ckeditor/ckeditor5-link/src/link';
import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
import List from '@ckeditor/ckeditor5-list/src/list';

import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';

import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';

import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
// import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';



const SERVER_URL = process.env.REACT_APP_SERVER_URL;

class MyUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    // Update the loader's progress.
    return this.loader.file
      .then(uploadFile => {
        return new Promise((resolve, reject) => {
          const data = new FormData();
          data.append('attachedImage', uploadFile);

          service.createAttachedImage(data)
            .then(response => {
              if (response.data.result === 'success') {
                resolve({
                  default: `${SERVER_URL}static/${response.data.imgPath}`
                });
              } else {
                reject(response.data.message);
              }
            }).catch(response => {
              reject('Upload failed');
            });
        });
      });
  }

  // Aborts the upload process.
  abort() {
    // Reject the promise returned from the upload() method.
    console.warn('upload abort');
    // server.abortUpload();
  }
}

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    return new MyUploadAdapter(loader);
  };
}

function Editor2({ text, setText, readOnly }) {

  const editorConfiguration = {
    plugins: [
      Essentials, Heading, Paragraph,
      Bold, Strikethrough, Underline, Link, TodoList, List, 
      Indent, IndentBlock, BlockQuote,
      Image, ImageCaption, ImageToolbar, ImageUpload, ImageResize, ImageStyle,
      MediaEmbed, Table, TableToolbar],
    extraPlugins: [MyCustomUploadAdapterPlugin],
    toolbar: [
      'heading', '|',
      'bold', 'Strikethrough', 'Underline', '|',
      'link', 'bulletedList', 'todoList', 'blockQuote', '|',
      'indent', 'outdent', '|',
      'undo', 'redo', '|',
      'imageUpload', 'mediaembed', 'insertTable'],
    image: {
      toolbar: ['imageStyle:full', 'imageStyle:side', '|', 'imageTextAlternative']
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
    }
  };

  if(readOnly) {
    delete editorConfiguration.toolbar;
  }

  return (
    <div className={`sa-ck ${readOnly ? 'sa-viewer' : 'sa-editor'}`}>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        data={text}
        disabled={readOnly}
        onReady={editor => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          // const data = editor.getData();
          setText(editor.getData());
          // console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          // console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          // console.log('Focus.', editor);
        }}
      />
    </div>
  );
}

export default Editor2;
