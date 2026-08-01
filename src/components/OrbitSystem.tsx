export default function OrbitSystem() {
  return (
    <div className="orbit-system" aria-hidden="true">
      <div className="orbit-glow" />

      <div className="orbit-ring orbit-ring-1">
        <span className="orbit-dot orbit-dot-blue" />
      </div>
      <div className="orbit-ring orbit-ring-2">
        <span className="orbit-dot orbit-dot-cyan" />
      </div>
      <div className="orbit-ring orbit-ring-3">
        <span className="orbit-dot orbit-dot-purple" />
      </div>

      <div className="orbit-core" />

      <span className="orbit-star orbit-star-1" />
      <span className="orbit-star orbit-star-2" />
      <span className="orbit-star orbit-star-3" />
      <span className="orbit-star orbit-star-4" />
    </div>
  );
}
