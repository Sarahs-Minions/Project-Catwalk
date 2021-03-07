import React, { useState, useEffect } from 'react';
import ZoomedImage from './ZoomedImage.jsx';
// UNINSTALL REACT IMAGE MAGNIFIERS

export default function ExpandedView({ close, handleIconClick, url, photos, back, forward, selectedPhotoIndex }) {

  const [isZoomed, toggleZoom] = useState(false);

  const renderExpandedViewIcons = () => {
    return <div className='expanded-view-icons-row'>
      {photos.map((photo, i) => {
        return <div
          className='expanded-view-icon'
          key={i}
          onClick={(e) => handleIconClick(e, photo.url, i)}
          id={i === selectedPhotoIndex ? 'selected' : null}
        >
        </div>
      })}
    </div>
  }

  const zoom = () => {
    toggleZoom(!isZoomed)
  }

  return (
    <div className='expanded-gallery-modal-inner'>
      <button onClick={() => close()} id='modal-x-button'>&#x2715;</button>
      {isZoomed ?
        <ZoomedImage url={url} zoom={zoom} />
        : <img className='expanded-view-image' onClick={() => zoom()} src={url} />
      }
      <div className={isZoomed ? 'expanded-arrow-and-icon-container-fadeout' : 'expanded-arrow-and-icon-container'} >
        <div className='expanded-arrow-and-icon-container'>
          <button
            id={selectedPhotoIndex > 0 ? null : 'hidden'}
            className='horizontal-arrow'
            style={{ marginTop: '-0.5rem' }}
            onClick={(e) => { back(e) }}
          >&#x2190;
          </button>
          {renderExpandedViewIcons()}
          <button
            id={selectedPhotoIndex < photos.length - 1 ? null : 'hidden'}
            className='horizontal-arrow'
            style={{ marginTop: '-0.5rem' }}
            onClick={(e) => { forward(e) }}
          >&#x2192;
          </button>
        </div>
      </div>
    </div>

  )
}