import React, { useState } from 'react';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  margin: 60px 0;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const ImageCard = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transform: scale(1);
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 20px 50px rgba(59, 130, 246, 0.3);
  }
`;

const StockImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: all 0.3s ease;
  
  ${ImageCard}:hover & {
    transform: scale(1.1);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 30px 20px 20px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  
  ${ImageCard}:hover & {
    transform: translateY(0);
  }
`;

const ImageTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 1.2rem;
  font-weight: 600;
`;

const ImageDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
  line-height: 1.4;
`;

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const devopsImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
      title: "Cloud Infrastructure",
      description: "Modern cloud architecture with scalable microservices and container orchestration"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80",
      title: "CI/CD Pipeline",
      description: "Automated deployment pipelines ensuring rapid and reliable software delivery"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      title: "Monitoring & Analytics",
      description: "Real-time system monitoring with advanced analytics and alerting"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80",
      title: "Container Technology",
      description: "Docker and Kubernetes orchestration for scalable application deployment"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
      title: "Infrastructure as Code",
      description: "Terraform and ARM templates for reproducible infrastructure management"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1551033406-611cf9a28f54?w=800&q=80",
      title: "Security & Compliance",
      description: "Advanced security practices and compliance automation across all environments"
    }
  ];

  return (
    <GalleryContainer>
      <h3 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.8rem' }}>
        DevOps Excellence in Action
      </h3>
      <p style={{ textAlign: 'center', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
        Explore the visual representation of modern DevOps practices, cloud architecture, 
        and infrastructure automation that power today's digital transformation.
      </p>
      
      <GalleryGrid>
        {devopsImages.map((image) => (
          <ImageCard key={image.id} onClick={() => setSelectedImage(image)}>
            <StockImage 
              src={image.url} 
              alt={image.title}
              loading="lazy"
            />
            <ImageOverlay>
              <ImageTitle>{image.title}</ImageTitle>
              <ImageDescription>{image.description}</ImageDescription>
            </ImageOverlay>
          </ImageCard>
        ))}
      </GalleryGrid>
    </GalleryContainer>
  );
};

export default ImageGallery;
