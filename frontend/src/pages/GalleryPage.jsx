import { useMemo, useState, useCallback, useEffect } from 'react'
import PageMeta from '../components/PageMeta'
import { galleryImages } from '../data/tours'
import galleryHero from '../assets/33.jpeg'

function GalleryPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [featuredIndex, setFeaturedIndex] = useState(0)

  const shuffledGalleryImages = useMemo(
    () => [...galleryImages].sort(() => Math.random() - 0.5),
    [],
  )
  const featuredImages = useMemo(() => shuffledGalleryImages.slice(0, 5), [shuffledGalleryImages])
  const galleryMosaic = useMemo(() => shuffledGalleryImages.slice(5), [shuffledGalleryImages])

  useEffect(() => {
    if (featuredImages.length < 2) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setFeaturedIndex((currentIndex) => {
        let nextIndex = currentIndex

        while (nextIndex === currentIndex) {
          nextIndex = Math.floor(Math.random() * featuredImages.length)
        }

        return nextIndex
      })
    }, 4200)

    return () => window.clearInterval(intervalId)
  }, [featuredImages.length])

  const openModalAt = useCallback(
    (index) => {
      setCurrentIndex(index % shuffledGalleryImages.length)
      setModalOpen(true)
    },
    [shuffledGalleryImages.length],
  )

  const closeModal = useCallback(() => setModalOpen(false), [])

  const goNext = useCallback(
    () => setCurrentIndex((idx) => (idx + 1) % shuffledGalleryImages.length),
    [shuffledGalleryImages.length],
  )

  const goPrev = useCallback(
    () =>
      setCurrentIndex((idx) => (idx === 0 ? shuffledGalleryImages.length - 1 : idx - 1)),
    [shuffledGalleryImages.length],
  )

  return (
    <>
      <PageMeta
        title="Gallery"
        description="Explore Ajmeyl Tours & Safaris moments through beaches, island scenery, and memorable travel experiences."
      />

      <section
        className="gallery-page-hero"
        style={{ '--gallery-hero-image': `url(${galleryHero})` }}
      >
        <div className="container gallery-page-hero__content">
          <h1>AJMEYL TOURS & SAFARIS GALLERY</h1>
        </div>
      </section>

      <section className="section gallery-page-section">
        <div className="container">
          <div className="gallery-page-intro">
            <p className="section-tag">Gallery Highlights</p>
            <h2>Island moments worth remembering</h2>
            <p>
              From turquoise waters and dhow rides to peaceful beach afternoons, this
              gallery brings together Zanzibar coastlines, cultural stops, and safari
              scenes in a more immersive visual flow.
            </p>
          </div>

          <section className="gallery-showcase" aria-label="Featured gallery moments">
            <div className="gallery-showcase__stage">
              {featuredImages.map((image, index) => (
                <button
                  type="button"
                  key={`featured-${image}-${index}`}
                  className={`gallery-showcase__slide ${
                    index === featuredIndex ? 'gallery-showcase__slide--active' : ''
                  }`}
                  style={{ backgroundImage: `url(${image})` }}
                  onClick={() => openModalAt(index)}
                  aria-label={`Open featured gallery image ${index + 1}`}
                >
                  <span className="gallery-showcase__overlay" />
                </button>
              ))}

              <div className="gallery-showcase__copy">
                <p className="section-tag">Featured Frame</p>
                <h3>Zanzibar and safari scenes that set the tone for the journey</h3>
                <p>
                  A slow-moving visual spotlight rotates through standout moments before
                  you explore the wider gallery below.
                </p>
              </div>
            </div>

            <div className="gallery-showcase__rail" aria-label="Featured image selector">
              {featuredImages.map((image, index) => (
                <button
                  type="button"
                  key={`thumb-${image}-${index}`}
                  className={`gallery-showcase__thumb ${
                    index === featuredIndex ? 'gallery-showcase__thumb--active' : ''
                  }`}
                  style={{ backgroundImage: `url(${image})` }}
                  onClick={() => setFeaturedIndex(index)}
                  aria-label={`Show featured image ${index + 1}`}
                />
              ))}
            </div>
          </section>

          <div className="gallery-page-grid">
            {galleryMosaic.map((image, index) => (
              <button
                type="button"
                key={`${image}-${index}`}
                className={`gallery-page-grid__item gallery-page-grid__item--${(index % 5) + 1}`}
                style={{ backgroundImage: `url(${image})` }}
                onClick={() => openModalAt(index + featuredImages.length)}
                aria-label={`Open gallery image ${index + featuredImages.length + 1}`}
              >
                <span className="gallery-page-grid__glow" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {modalOpen && (
        <div className="gallery-modal" role="dialog" aria-modal="true">
          <button
            className="gallery-modal__close"
            onClick={closeModal}
            aria-label="Close gallery viewer"
          >
            x
          </button>
          <button
            className="gallery-modal__nav gallery-modal__nav--left"
            onClick={goPrev}
            aria-label="Previous photo"
          >
            {'<'}
          </button>
          <img
            className="gallery-modal__image"
            src={shuffledGalleryImages[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
          />
          <button
            className="gallery-modal__nav gallery-modal__nav--right"
            onClick={goNext}
            aria-label="Next photo"
          >
            {'>'}
          </button>
        </div>
      )}
    </>
  )
}

export default GalleryPage
