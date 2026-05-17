"use client";

import Image from "next/image";
import styles from "./GuideCarousel.module.css";

interface Slide {
  src: string;
  alt: string;
}

interface Props {
  slides: Slide[];
}

export default function GuideCarousel({ slides }: Props) {
  if (!slides?.length) return null;

  return (
    <div className={styles.wrap}>
      <div className={styles.track}>
        {slides.map((slide, i) => (
          <div key={i} className={styles.slide}>
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className={styles.img}
              sizes="(max-width: 768px) 90vw, 700px"
            />
          </div>
        ))}
      </div>
      <p className={styles.hint}>← arraste →</p>
    </div>
  );
}
