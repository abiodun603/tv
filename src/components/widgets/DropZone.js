import React from 'react';
import Dropzone from 'react-dropzone';

import { Container, Image, Row } from 'react-bootstrap';

class DropZone extends React.Component {
  callback(files) {
    this.props.upload.setFile(files);
  }

  render() {
    return (
      <Dropzone
        accept={{
          'video/*': ['.avi', '.mp4', '.mpeg', '.mpg', '.mkv', '.m4v', '.flv'],
        }}
        onDrop={(acceptedFiles) => this.callback(acceptedFiles)}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Container>
                <div className="d-flex flex-column justify-content-center">
                  <Image
                    className="mx-auto mb-5"
                    src="icon/ic_combined-shape.svg"
                  />
                  <p className="text-center">
                    Drag and drop your video file here or click to select video
                    file. Please note .avi,.mkv, .mp4, .mpeg, .mpg, .m4v, .flv
                    formats are supported only. Please convert your video file
                    to one of these formats before uploading.
                  </p>
                </div>
              </Container>
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}
export default DropZone;
