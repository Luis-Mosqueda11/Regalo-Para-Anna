// Scroll Text Animation
document.addEventListener('DOMContentLoaded', () => {
    const textElements = document.querySelectorAll('.scroll-text');
    const secondaryText = document.querySelector('.scroll-text-secondary');
  
    if (!textElements.length) {
      console.error("No se encontraron elementos con la clase '.scroll-text'.");
      return;
    }
  
    textElements.forEach((textElement, index) => {
      const text = textElement.dataset.text;
      const textArray = text.split('');
  
      textElement.innerHTML = textArray
        .map(letter => `<span>${letter === ' ' ? '&nbsp;' : letter}</span>`)
        .join('');
  
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              console.log("El elemento es visible, comenzando la animación...");
              const letters = entry.target.querySelectorAll('span');
              letters.forEach((span, letterIndex) => {
                setTimeout(() => {
                  span.classList.add('visible');
                }, letterIndex * 50);
              });
  
              // Si es el último texto animado, mostrar el secundario
              if (index === textElements.length - 1 && secondaryText) {
                setTimeout(() => {
                  secondaryText.classList.add('visible');
                }, letters.length * 50 + 300); // Retraso tras terminar la animación principal
              }
  
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.5,
        }
      );
  
      observer.observe(textElement);
    });
  });
  