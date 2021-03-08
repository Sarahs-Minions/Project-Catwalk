import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ExpandedView from './ExpandedView.jsx';

const modalStyle = {
  content: {
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    overflowY: 'hidden',
  },
};

export default function ImageGallery({ selectPhoto, photos }) {
  // By default, the first image in the set will be displayed as the main image
  // When switching between styles, the index of the image currently selected should be maintained when the gallery updates for the new style

  const [selectedPhotoIndex, changePhotoIndex] = useState(0);

  // The gallery will be viewable in two states.  A default collapsed view, and an expanded view.
  const [expandedGalleryView, toggleGalleryView] = useState(false);

  const between = (target, min, max) => target >= min && target <= max;

  // If more than 7 images are in the set for the style selected, the user should be able to scroll forward and backwards through the thumbnails. An arrow button pointing either direction should allow the customer to scroll through the remaining thumbnails in either direction.

  const shouldShowThumbnail = (idx) => {
    if (selectedPhotoIndex + 6 < photos.length) {
      return between(idx, selectedPhotoIndex, selectedPhotoIndex + 6);
    }
    const diff = Math.abs((selectedPhotoIndex + 7) - photos.length);
    if (between(idx, selectedPhotoIndex - diff, photos.length)) {
      return true;
    }
    return between(idx, selectedPhotoIndex, photos.length);
  };

  const renderThumbnails = () => {
    if (photos.length < 7) {
      return (
        <div className="gallery-thumbnails-container">
          {photos.map((photo, i) => (
            <img
              className="image-thumbnail"
              key={i}
              src={photo.thumbnail_url}
            // Clicking on any thumbnail should update the main image to match that shown in the thumbnail clicked
              onClick={(event) => {
                handleThumbnailClick(event, photo.url, i);
              }}
            // The thumbnail corresponding to the image currently selected as the main image should be highlighted to indicate the current selection.
              id={i === selectedPhotoIndex ? 'selected' : null}
            />
          ))}
        </div>
      );
    }
    return (
      <div className="gallery-thumbnails-container">
        <button
          id={selectedPhotoIndex === 0 ? 'hidden' : null}
          className="vertical-arrow"
          onClick={(event) => { scrollBack(event); }}
        >
          <i className="fas fa-chevron-up" />
        </button>
        {photos.map((photo, i) => (
          <img
            className={shouldShowThumbnail(i) ? 'image-thumbnail' : 'image-thumbnail-hidden'}
            key={i}
            src={photo.thumbnail_url}
            onClick={(event) => {
              handleThumbnailClick(event, photo.url, i);
            }}
            id={i === selectedPhotoIndex ? 'selected' : null}
          />
        ))}
        <button
          id={selectedPhotoIndex === photos.length - 1 ? 'hidden' : null}
          className="vertical-arrow"
          onClick={(event) => { scrollForward(event); }}
        >
          <i className="fas fa-chevron-down" />
        </button>
      </div>
    );
  };

  const handleThumbnailClick = (event, url, idx) => {
    event.stopPropagation();
    selectPhoto(url);
    changePhotoIndex(idx);
  };

  const scrollForward = (event) => {
    event.stopPropagation();
    if (selectedPhotoIndex === photos.length - 1) {

      // changePhotoIndex(0) for infinite scroll
    } else {
      const nextIndex = selectedPhotoIndex + 1;
      changePhotoIndex(nextIndex);
    }
  };

  const scrollBack = (event) => {
    event.stopPropagation();
    if (selectedPhotoIndex === 0) {

      // changePhotoIndex(photos.length - 1) for infinite scroll
    } else {
      const nextIndex = selectedPhotoIndex - 1;
      changePhotoIndex(nextIndex);
    }
  };

  const mainImageCSS = (url) =>
    // possibly need to add error handling for the api url strings with typos in them ?
    ({
      backgroundImage: `url(${url})`,
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'scroll',
      backgroundPosition: 'center',
    });

  return (
    <div className="image-gallery-outer">
      {photos.length
        ? (
          <div>
            <div
              className="image-gallery-main-image"
              style={mainImageCSS(photos[selectedPhotoIndex].url)}
              onClick={() => (expandedGalleryView ? null : toggleGalleryView(true))}
            >
              {renderThumbnails()}
              {/* EXPANDED VIEW */}
              <Modal id="expanded-gallery-modal" isOpen={expandedGalleryView} style={modalStyle} ariaHideApp={false}>
                <ExpandedView
                  close={() => toggleGalleryView(false)}
                  photos={photos}
                  selectedPhotoIndex={selectedPhotoIndex}
                  url={photos[selectedPhotoIndex].url}
                  handleIconClick={handleThumbnailClick}
                  back={scrollBack}
                  forward={scrollForward}
                />
              </Modal>
              <div className="horizontal-arrow-container">
                <button className="horizontal-arrow" id={selectedPhotoIndex > 0 ? null : 'hidden'} onClick={(event) => { scrollBack(event); }}>
                  <i className="fas fa-chevron-left" />
                </button>
                <button className="horizontal-arrow" id={selectedPhotoIndex < photos.length - 1 ? null : 'hidden'} onClick={(event) => { scrollForward(event); }}>
                  <i className="fas fa-chevron-right" />
                </button>
              </div>
            </div>
          </div>
        )
        : null}
    </div>
  );
}
