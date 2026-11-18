import type { Video } from "@/data/propiedades";
import { srcVideo } from "@/lib/medios";

export function VideoPropiedad({ video, titulo, poster }: { video: Video; titulo: string; poster: string }) {
  const src = srcVideo(video);
  return (
    <div className="ficha__video frame" style={{ aspectRatio: `${video.width} / ${video.height}` }}>
      <video controls playsInline preload="none" poster={src.poster ?? poster} aria-label={`Video del recorrido por ${titulo}`}>
        <source src={src.mp4} type="video/mp4" />
      </video>
    </div>
  );
}
