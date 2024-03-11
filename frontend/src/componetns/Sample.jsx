import React from 'react'

function Sample() {
  const handleAddImageField = () => {
    setImages(prevImages => [...prevImages, []]);
  };

  const handleRemoveImageField = (index) => {
    setImages(prevImages => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handleImageChange = (index, event) => {
    const fileList = Array.from(event.target.files);

    setImages(prevImages => {
      const updatedImages = [...prevImages];
      updatedImages[index] = fileList;
      return updatedImages;
    });
  };
  return (
    <div>
      {images.map((imageList, index) => (
        <div key={index}>
          <input type="file" multiple onChange={(event) => handleImageChange(index, event)} />
          <button type="button" onClick={() => handleRemoveImageField(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={handleAddImageField}>Add Image Field</button>
    </div>
  )
}

export default Sample
















