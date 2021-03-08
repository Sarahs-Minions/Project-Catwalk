import React, { useState, useEffect } from 'react';
import ZoomedImage from './ZoomedImage.jsx';

export default function ExpandedView({
  close, handleIconClick, url, photos, back, forward, selectedPhotoIndex,
}) {
  const [isZoomed, toggleZoom] = useState(false);

  const renderExpandedViewIcons = () => (
    <div className="expanded-view-icons-row">
      {photos.map((photo, i) => (
        <div
          className="expanded-view-icon"
          key={i}
          onClick={(e) => handleIconClick(e, photo.url, i)}
          id={i === selectedPhotoIndex ? 'selected' : null}
        />
      ))}
    </div>
  );

  const zoom = () => {
    toggleZoom(!isZoomed);
  };

  return (
    <div className="expanded-gallery-modal-inner">
      <button onClick={() => close()} id="modal-x-button">&#x2715;</button>
      {isZoomed
        ? <ZoomedImage url={url} zoom={zoom} />
        : <img className="expanded-view-image" onClick={() => zoom()} src={url} />}
      <div className={isZoomed ? 'expanded-arrow-and-icon-container-fadeout' : 'expanded-arrow-and-icon-container-fadein'}>
        {isZoomed ? null : (
          <div className="expanded-arrow-and-icon-container">
            <button
              id={selectedPhotoIndex > 0 ? null : 'hidden'}
              className="horizontal-arrow"
              onClick={(e) => { back(e); }}
            >
              <i className="fas fa-chevron-left" />
            </button>
            {renderExpandedViewIcons()}
            <button
              id={selectedPhotoIndex < photos.length - 1 ? null : 'hidden'}
              className="horizontal-arrow"
              onClick={(e) => { forward(e); }}
            >
              <i className="fas fa-chevron-right" />
            </button>
          </div>
        )}
      </div>
    </div>

  );
}
