import * as React from 'react';

import * as loadImage from 'blueimp-load-image';

export interface FileUploadProps {
  submitFile: (fileBase64: string, fileType: string, fileName: string) => Promise<void>;
  maxWidth?: number;
  maxHeight?: number;
  isUploading: boolean;
}

export class FileUpload extends React.Component<FileUploadProps, {}> {
  private fileUploadInput: HTMLInputElement | null;

  private handleWrapperClick() {
    this.fileUploadInput && this.fileUploadInput.click();
  }

  private onFileChange(file: File) {
    this.setState({loading: true});

    loadImage(
      file,
      (img: HTMLCanvasElement) => {
        this.props.submitFile(img.toDataURL(file.type), file.type, file.name);
      },
      {
        maxWidth: this.props.maxWidth,
        maxHeight: this.props.maxHeight,
        orientation: true,
        crop: true,
      }
    );
  }

  public render() {
    return (
      <div onClick={() => this.handleWrapperClick()}>
        <input
          ref={input => (this.fileUploadInput = input)}
          type="file"
          accept="image/*"
          name="files"
          onChange={event => event.target.files && this.onFileChange(event.target.files[0])}
          style={{display: 'none'}}
        />
        {!this.props.isUploading && this.props.children}
        {this.props.isUploading && <div className="loader small" />}
      </div>
    );
  }
}
